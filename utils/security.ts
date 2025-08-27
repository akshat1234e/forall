import DOMPurify from 'dompurify';

// XSS Protection
export const sanitizeHtml = (html: string): string => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(html);
  }
  // Server-side fallback
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
             .replace(/javascript:/gi, '')
             .replace(/on\w+\s*=/gi, '');
};

export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// CSRF Protection
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

export const setCSRFToken = (token: string): void => {
  sessionStorage.setItem('csrf_token', token);
};

export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};

// Input Validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};