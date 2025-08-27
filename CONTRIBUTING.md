# Contributing to ForAll Herbals

Thank you for your interest in contributing to ForAll Herbals! This document provides guidelines for contributing to our natural skincare e-commerce project.

## 🌿 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git knowledge
- TypeScript and React experience
- Familiarity with Tailwind CSS

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/forall.git`
3. Install dependencies: `npm install`
4. Copy environment variables: `cp .env.example .env.local`
5. Start development server: `npm run dev`

## 📋 Development Guidelines

### Code Style
- Follow the ESLint and Prettier configurations
- Use TypeScript strict mode
- Follow the brand guidelines in `/guidelines/Guidelines.md`
- Write meaningful component and variable names

### Commit Messages
Use conventional commit format:
```
feat: add product filtering functionality
fix: resolve cart quantity update issue
docs: update README with deployment instructions
style: improve button hover animations
refactor: optimize image loading performance
test: add unit tests for cart provider
```

### Branch Naming
- `feature/product-search` - New features
- `fix/cart-bug` - Bug fixes
- `docs/api-documentation` - Documentation updates
- `refactor/header-component` - Code refactoring

## 🎨 Design Guidelines

### Colors & Branding
- Maintain the natural, luxury aesthetic
- Use the defined color palette (peach, dark green, cream)
- Ensure WCAG AA accessibility compliance
- Test on both light and dark themes

### Components
- Follow the existing component patterns
- Use shadcn/ui components when possible
- Include proper TypeScript interfaces
- Add hover states and smooth animations

### Responsive Design
- Mobile-first approach
- Test on common device sizes
- Ensure touch targets are 44px minimum
- Optimize images for different screen densities

## 🧪 Testing

### Before Submitting
- [ ] Code compiles without TypeScript errors
- [ ] ESLint passes without errors
- [ ] Components render correctly on mobile and desktop
- [ ] Accessibility features work properly
- [ ] No console errors in browser
- [ ] Performance is acceptable (check Lighthouse)

### Testing Checklist
- [ ] New features work as expected
- [ ] Existing functionality isn't broken
- [ ] Error states are handled gracefully
- [ ] Loading states provide good UX
- [ ] Forms validate properly

## 📦 Pull Request Process

### Before Creating PR
1. Ensure your branch is up to date with main
2. Run `npm run build` to verify production build
3. Test your changes thoroughly
4. Update documentation if needed

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Tested on mobile devices
- [ ] Tested on desktop browsers
- [ ] Accessibility testing completed
- [ ] Performance impact assessed

## Screenshots
Include screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
```

## 🐛 Bug Reports

### Creating Bug Reports
Include:
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and device information
- Screenshots or recordings if applicable
- Console errors (if any)

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
Add screenshots to help explain the problem

**Environment**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone X, Desktop]
```

## 💡 Feature Requests

### Suggesting Features
- Check existing issues first
- Provide clear use case
- Explain how it fits the brand vision
- Consider implementation complexity
- Include mockups if applicable

## 🚀 Release Process

### Version Numbers
We use semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed
- [ ] Browser compatibility verified

## 📞 Getting Help

- Check existing issues and documentation
- Join our community discussions
- Ask questions in issue comments
- Reach out to maintainers for major changes

## 🙏 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Invited to the contributors channel

Thank you for helping make ForAll Herbals better! 🌿