# Vue 3 Subpage - Multi-Channel Communication Management

A modern Vue 3 application for managing multiple communication channels and widgets, built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Multi-Channel Support**: Manage various communication channels including:
  - WhatsApp
  - Facebook Messenger
  - Instagram
  - Telegram
  - LINE
  - TikTok
  - Custom Channels
- **Widget Builder**: Create and customize chat widgets with live preview
- **Bot Integration**: Configure and manage chatbots across different channels
- **Responsive Design**: Built with Tailwind CSS for a mobile-first approach
- **Type Safety**: Full TypeScript support for enhanced developer experience
- **Component Library**: Reusable UI components with Storybook documentation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vue-3-subpage
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create environment variables file:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env` file

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 📦 Build

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🧪 Testing

Run unit tests:

```bash
npm run test
# or
yarn test
```

Run tests in watch mode:

```bash
npm run test:watch
# or
yarn test:watch
```

## 📚 Storybook

To view the component library documentation:

```bash
npm run storybook
# or
yarn storybook
```

## 🏗️ Project Structure

```
vue-3-subpage/
├── src/
│   ├── api/              # API service modules
│   ├── assets/           # Static assets (images, styles, etc.)
│   ├── components/       # Reusable Vue components
│   │   ├── common/       # Common UI components
│   │   ├── form/         # Form-related components
│   │   └── icons/        # Icon components
│   ├── composables/      # Vue 3 composables for business logic
│   ├── features/         # Feature-specific components and pages
│   ├── layouts/          # Application layouts
│   ├── pages/            # Page components
│   ├── router/           # Vue Router configuration
│   ├── stores/           # Pinia state management
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── views/            # View components
├── docs/                 # Documentation
├── public/               # Public static files
└── stories/              # Storybook stories
```

## 🎨 Technology Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Component Documentation**: Storybook
- **Linting**: ESLint
- **Code Formatting**: Prettier

## 🔧 Configuration

### Tailwind CSS

Tailwind configuration can be found in `tailwind.config.js`. For styling guidelines, refer to `docs/TAILWIND_GUIDE.md`.

### TypeScript

TypeScript configuration files:

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific configuration
- `tsconfig.node.json` - Node.js-specific configuration

### Vite

Vite configuration is in `vite.config.ts`.

## 📝 Code Style

This project follows Vue 3 best practices:

- Use `<script setup>` syntax for components
- Utilize Composition API for logic reusability
- Follow TypeScript strict mode
- Use Tailwind CSS utility classes for styling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👥 Team

- **Frontend Team** - Vue 3 application development
- **UI/UX Team** - Design and user experience

## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

Built with ❤️ using Vue 3 + TypeScript + Vite
