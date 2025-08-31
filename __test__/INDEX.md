# 📋 Test Suite Index

## 📁 Test Files Structure

```
__test__/
├── 📄 README.md                    # Complete testing documentation
├── 📄 INDEX.md                     # This file - Quick navigation
├── 🧪 AboutPage.test.tsx           # About page tests
├── 🧪 BlogPage.test.tsx            # Blog page tests  
├── 🧪 ContactPage.test.tsx         # Contact page tests
├── 🧪 CVPage.test.tsx              # CV page tests
├── 🧪 Hero.test.tsx                # Hero component tests (comprehensive)
├── 🧪 HomePage.test.tsx            # Home page tests
├── 🧪 Layout.test.tsx              # Layout components tests
└── 🧪 routes.test.tsx              # Routing tests
```

## 🎯 Quick Test Commands

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test Hero
pnpm test HomePage
pnpm test routes

# Watch mode for development
pnpm test:watch

# Coverage report
pnpm test:coverage
```

## 🤖 Claude AI Test Commands

```bash
# Scan for missing tests
pnpm run claude:test-scan

# Create tests for a component
pnpm run claude:test-create

# Debug failing tests
pnpm run claude:test-debug

# Full interactive suite
pnpm run claude:test-full
```

## 📊 Current Test Coverage

- ✅ **Hero Component** - 12 comprehensive tests
- ✅ **Page Components** - Basic structure tests
- ✅ **Routing System** - Navigation and error handling
- ✅ **Layout Components** - UI component tests

## 🎯 Test Quality Standards

All tests in this suite follow these standards:
- **Integration testing** with real routing
- **Accessibility testing** with proper ARIA roles
- **User interaction testing** with fireEvent
- **Edge case coverage** for robust components
- **Documentation** with JSDoc comments

## 📖 Documentation

For complete testing documentation, see [README.md](README.md)

---
*Quick reference for the test suite - Updated automatically*