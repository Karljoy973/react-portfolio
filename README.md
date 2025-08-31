# 🚀 React Portfolio

A high-performance, modern portfolio site built with React Router v7, featuring automated testing with AI assistance and comprehensive development tools.

## ✨ Features

### 🎯 Core Features
- ⚡️ **Blazing fast React frontend** with React Router v7
- 🗄️ **Backend powered by Neon DB** (coming soon)
- 📦 **Asset compression** for optimal performance
- 🎨 **Styled with Tailwind CSS v4** - Latest version with modern features
- 🔒 **TypeScript** for complete type safety
- 📱 **Responsive design** with mobile-first approach

### 🧪 Advanced Testing Suite
- **Comprehensive test coverage** with Vitest
- **🤖 AI-powered test automation** with Claude integration
- **Automated test generation** for React components
- **Smart error detection** and debugging assistance
- **Interactive test management** suite

### 🛠️ Development Tools
- **Hot reload** development server
- **ESLint + Prettier** for code quality
- **Husky** pre-commit hooks
- **TypeScript** strict mode
- **Automated CI/CD** with GitHub Actions

### 🎨 UI/UX
- **Modern component architecture**
- **Accessible design** (ARIA compliant)
- **Dark/Light theme** support
- **Smooth animations** and transitions
- **SEO optimized**

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended) or npm
- **PowerShell** (for Claude AI scripts on Windows)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-portfolio

# Install dependencies with pnpm (recommended)
pnpm install

# Or with npm
npm install
```

### 🔧 Development

Start the development server:

```bash
# With pnpm
pnpm dev

# With npm  
npm run dev
```

The app will be available at `http://localhost:5173`

### 🏗️ Building for Production

Build and optimize for production:

```bash
pnpm build
```

### 🧪 Testing

#### Basic Testing
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

#### 🤖 AI-Powered Testing with Claude

Our project includes an advanced AI-powered testing suite that works with Claude AI:

```bash
# Scan project for missing tests
pnpm run claude:test-scan

# Create tests for specific components
pnpm run claude:test-create

# Debug failing tests automatically  
pnpm run claude:test-debug

# Full interactive testing suite
pnpm run claude:test-full
```

**How it works:**
1. **Scan** your project to identify components without tests
2. **Generate** detailed prompts for Claude AI
3. **Create** comprehensive test suites with Claude's help
4. **Debug** issues automatically with intelligent error analysis

> 📖 **See [Testing Documentation](__test__/README.md)** for detailed testing guide

## 🚀 Deployment

### 🐳 Docker

Build and run with Docker:

```bash
# Build the image
docker build -t react-portfolio .

# Run the container
docker run -p 3000:3000 react-portfolio
```

### ☁️ Cloud Deployment

The project is optimized for deployment on:
- **Vercel** (recommended for React Router v7)
- **Netlify**
- **Railway**
- **Docker containers**

### 🔄 CI/CD

Automated workflows with GitHub Actions:
- ✅ **Automated testing** on every push
- ✅ **Build verification** for pull requests
- ✅ **Deployment** to staging/production
- ✅ **Code quality checks** (ESLint, Prettier)

## 📁 Project Structure

```
react-portfolio/
├── 📂 app/                    # React Router v7 app directory
│   ├── 📂 components/         # Reusable UI components
│   ├── 📂 routes/             # Route components
│   ├── 📂 home/               # Home page
│   ├── 📂 about/              # About page
│   ├── 📂 contact/            # Contact page
│   └── 📂 cv/                 # CV page
├── 📂 __test__/               # Test files and documentation
├── 📂 scripts/                # Claude AI automation scripts
├── 📂 reports/                # Generated reports and analysis
├── 📂 public/                 # Static assets
└── 📂 .github/workflows/      # CI/CD configurations
```

## 🤖 Claude AI Integration

This project features a unique **AI-powered development workflow** using Claude AI:

### 🔍 Automated Code Analysis
- **Component scanning** for missing tests
- **Dependency analysis** and optimization suggestions
- **Code quality assessment** with actionable insights

### 🧪 Intelligent Test Generation
- **Automatic test creation** for React components
- **Accessibility testing** integration
- **Edge case detection** and coverage
- **Mock generation** for complex dependencies

### 🐛 Smart Debugging
- **Error pattern recognition** in test failures
- **Solution suggestions** with code examples
- **Performance bottleneck identification**

### 📊 Development Insights
- **Test coverage reports** with improvement suggestions
- **Component complexity analysis**
- **Best practices recommendations**

## 🛠️ Available Scripts

### Development
```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm typecheck        # Run TypeScript checks
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm lint:html        # Generate HTML lint report
pnpm pretty           # Format code with Prettier
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
pnpm snapshots        # Run snapshot tests
pnpm snapshots:update # Update snapshots
```

### Claude AI Automation
```bash
pnpm run claude:test-scan    # Scan for missing tests
pnpm run claude:test-create  # Generate test prompts
pnpm run claude:test-debug   # Debug test failures
pnpm run claude:test-full    # Full testing suite
```

## 🎯 Roadmap

### 🔄 Current Sprint
- [x] **AI-powered testing suite** with Claude integration
- [x] **Comprehensive component testing** 
- [x] **Automated error debugging**
- [ ] **Performance optimization** analysis
- [ ] **Accessibility audit** automation

### 🚀 Next Features
- [ ] **Neon DB backend** integration
- [ ] **Authentication system** with secure login
- [ ] **Contact form** with email notifications
- [ ] **Blog system** with markdown support
- [ ] **Portfolio showcase** with project details
- [ ] **Admin dashboard** for content management

### 🔮 Future Enhancements
- [ ] **Multi-language support** (i18n)
- [ ] **Progressive Web App** (PWA) features
- [ ] **Advanced analytics** integration
- [ ] **API documentation** generator


### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch
3. **Run** `pnpm run claude:test-scan` to check test coverage
4. **Develop** your feature with tests
5. **Use** `pnpm run claude:test-create` for test generation
6. **Submit** a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Router Team** for the amazing v7 framework
- **Anthropic** for Claude AI integration possibilities
- **Vercel** for hosting and deployment platform
- **Tailwind CSS** for the utility-first CSS framework

---

**Built with ❤️ using React Router v7, Claude AI, and modern web technologies**

> 🚀 **Ready to build the future of web development with AI assistance!**
