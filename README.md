# React Portfolio

A high-performance portfolio site built with React. This project is designed for speed, scalability, and modern best practices. The backend will be powered by Neon DB, and the frontend will be optimized for fast load times and minimal resource usage.

## Features

- ⚡️ Blazing fast React frontend
- 🗄️ Backend powered by Neon DB (coming soon)
- 📦 Asset compression for optimal performance
- 🧪 Unit testing with [Vitest](https://vitest.dev/)
- 🚀 Continuous Integration with GitHub Actions
- 🎨 Styled with [Tailwind CSS](https://tailwindcss.com/)
- 🔒 TypeScript for type safety

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Building for Production

Build and compress frontend assets:

```bash
npm run build
```

### Testing

Run unit tests with Vitest:

```bash
npm run test
```

### Deployment

#### Docker

Build and run with Docker:

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

#### CI/CD

Automated tests and builds are run via GitHub Actions on every push.

## Roadmap

- Integrate Neon DB backend
- Add authentication and contact form
- Further optimize bundle size and loading times

---

Built with ❤️ using React, Neon DB, and modern
