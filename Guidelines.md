# ForAll Herbals - Development Guidelines

## 🌿 Brand Identity & Design System

### Color Palette
- **Primary**: Dark Green (#2D5016) - Used for buttons, links, and primary actions
- **Secondary**: Peach (#FFB5A7) - Used for accents, highlights, and secondary actions  
- **Background**: Cream (#FDF8F5) - Main background color for natural, warm feel
- **Text**: Black (#000000) - Primary text color for optimal readability

### Typography Hierarchy
- **Headlines**: Playfair Display (serif) - For luxury feel and main headings
- **Body Text**: Inter (sans-serif) - For readability and modern feel
- **Buttons/Labels**: Poppins (sans-serif) - For UI elements and CTAs
- **Accent Text**: Dancing Script (cursive) - For decorative elements only

### Spacing & Layout
- Use consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Mobile-first responsive design approach
- Minimum touch target size: 44px for mobile elements
- Maximum content width: 1200px for optimal readability

## 🎨 Component Guidelines

### Buttons
- **Primary Button**: Use `bg-primary text-primary-foreground` for main actions
- **Secondary Button**: Use `bg-secondary text-secondary-foreground` for secondary actions
- **Ghost Button**: Use `variant="ghost"` for subtle actions
- Always include hover states and focus indicators
- Round corners using `rounded-full` for pill style or default `rounded` for standard

### Cards
- Use `card-3d` class for interactive cards with hover effects
- Include subtle shadows: `shadow-lg hover:shadow-2xl`
- Add smooth transitions: `transition-all duration-300`
- Use `overflow-hidden` for cards with images

### Animations
- Use CSS custom animations defined in globals.css
- `float` - For gentle floating motion on icons/elements
- `fade-in-up` - For content appearing from bottom
- `slide-in` - For content sliding in from left
- `pulse-3d` - For emphasis on important elements
- Keep animation duration reasonable (300-800ms)

### Images
- Always use `ImageWithFallback` component instead of `<img>`
- Provide descriptive alt text for accessibility
- Use aspect ratios: `aspect-square`, `aspect-[4/3]`, `aspect-video`
- Optimize images for web (WebP format when possible)

## 📱 Responsive Design Rules

### Breakpoints
- Mobile: < 768px (default)
- Tablet: 768px - 1024px (md:)
- Desktop: > 1024px (lg:)
- Large Desktop: > 1280px (xl:)

### Mobile-First Approach
```tsx
// ✅ Good - Mobile first
<div className="text-sm md:text-base lg:text-lg">

// ❌ Avoid - Desktop first  
<div className="text-lg md:text-base sm:text-sm">
```

### Touch Targets
- Minimum 44px height for touchable elements
- Add adequate spacing between interactive elements
- Use larger font sizes on mobile for readability

## 🔧 Component Architecture

### File Organization
- One component per file
- Use PascalCase for component files
- Group related components in folders
- Export components from index files when needed

### Component Structure
```tsx
// ✅ Good component structure
interface ComponentProps {
  // Props with JSDoc comments
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {};
  
  // Early returns
  if (loading) return <Skeleton />;
  
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
}
```

### State Management
- Use `useState` for local component state
- Use Context (AuthProvider, CartProvider) for global state
- Keep state as close to where it's used as possible
- Use custom hooks for complex state logic

## 🎯 Performance Guidelines

### Image Optimization
- Use `ImageWithFallback` with proper sizing
- Implement lazy loading for below-fold images
- Use appropriate formats (WebP, AVIF when supported)
- Include loading states for dynamic content

### Bundle Optimization
- Import only needed components from libraries
- Use dynamic imports for heavy components
- Keep bundle size reasonable (< 1MB initial load)

### Animation Performance
- Use CSS transforms for animations (not layout properties)
- Prefer `transform` and `opacity` changes
- Use `will-change` sparingly and remove after animation

## 🛡️ Accessibility (a11y)

### Semantic HTML
- Use proper heading hierarchy (h1 > h2 > h3)
- Use semantic HTML elements (`nav`, `main`, `section`, `article`)
- Include proper ARIA labels for interactive elements

### Color & Contrast
- Maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Don't rely solely on color to convey information
- Test with color blindness simulators

### Interactive Elements
- Include focus indicators for keyboard navigation
- Use proper button vs link semantics
- Provide loading states and error messages
- Include descriptive alt text for images

## 🧪 Code Quality

### TypeScript
- Use strict TypeScript configuration
- Define interfaces for all props and data structures
- Avoid `any` type - use proper typing
- Use type guards for runtime type checking

### Error Handling
- Wrap API calls in try-catch blocks
- Provide user-friendly error messages
- Use toast notifications for user feedback
- Log errors for debugging (in development)

### Testing Approach
- Write unit tests for utility functions
- Test component behavior, not implementation
- Include accessibility tests
- Test error states and edge cases

## 🔒 Security & Best Practices

### Environment Variables
- Never commit API keys or secrets
- Use `.env.local` for local development
- Validate environment variables at startup
- Use different keys for development/production

### Data Handling
- Validate user inputs on both client and server
- Sanitize data before displaying
- Use HTTPS for all external API calls
- Implement proper authentication flows

### Performance Monitoring
- Monitor Core Web Vitals
- Track user interactions and errors
- Optimize for mobile performance
- Use performance profiling tools

## 📦 Dependencies

### Adding New Dependencies
- Evaluate bundle size impact
- Check for security vulnerabilities
- Ensure active maintenance
- Document usage in component files

### Preferred Libraries
- UI Components: shadcn/ui (already included)
- Icons: lucide-react
- Animations: motion/react (for complex animations)
- Forms: react-hook-form with zod validation
- Date handling: date-fns
- HTTP client: fetch API with custom wrappers

## 🚀 Deployment & CI/CD

### Pre-deployment Checklist
- [ ] TypeScript compilation passes
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Performance budget met
- [ ] Accessibility audit passed
- [ ] Mobile responsiveness tested

### Environment Setup
- Development: Local with Supabase local instance
- Staging: Vercel preview deployments
- Production: Vercel with custom domain

Remember: These guidelines ensure consistency across the ForAll Herbals codebase and maintain the high-quality, natural brand aesthetic we're building.