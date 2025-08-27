// WCAG AA Compliance utilities

export const addAriaLabels = (element: HTMLElement, label: string): void => {
  element.setAttribute('aria-label', label);
};

export const addAriaDescribedBy = (element: HTMLElement, describedById: string): void => {
  element.setAttribute('aria-describedby', describedById);
};

export const addKeyboardNavigation = (element: HTMLElement, onEnter: () => void): void => {
  element.setAttribute('tabindex', '0');
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onEnter();
    }
  });
};

export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const checkColorContrast = (foreground: string, background: string): boolean => {
  // Simplified contrast check - in production, use a proper contrast calculation library
  const fgLuminance = getLuminance(foreground);
  const bgLuminance = getLuminance(background);
  
  const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                   (Math.min(fgLuminance, bgLuminance) + 0.05);
  
  return contrast >= 4.5; // WCAG AA standard
};

const getLuminance = (color: string): number => {
  // Simplified luminance calculation
  const rgb = hexToRgb(color);
  if (!rgb) return 0;
  
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};