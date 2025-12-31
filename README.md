# 🔗 BotrixAI – URL Shortener (Frontend)

A modern, responsive URL shortener web application built by **BotrixAI**. This React-based frontend provides secure authentication,URL generation, history analytics, and a seamless user experience. The application communicates with a Spring Boot backend API.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#️-installation--setup)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Configuration](#-environment-configuration)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **🔗 URL Shortening** - Generate short URLs instantly with a user-friendly interface
- **🔐 Authentication** - Secure user authentication with login and signup functionality
- **🛡️ Protected Routes** - Route protection ensuring only authenticated users can access sensitive pages
- **📊 History & Analytics** - View URL history with detailed usage statistics
- **📱 Responsive Design** - Fully responsive UI built with TailwindCSS
- **⚡ Performance** - Optimized build with Vite for fast load times and efficient asset management

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | React 19.1.1 |
| **Build Tool** | Vite 7.1.7 |
| **Styling** | TailwindCSS 4.1.18 |
| **Routing** | React Router DOM 7.10.1 |
| **HTTP Client** | Axios 1.13.2 |
| **Icons** | React Icons 5.5.0 |
| **Backend** | Spring Boot (separate repository) |

> **Note:** This repository contains **only the frontend application**. The backend API is maintained in a separate repository.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn**
- **Git** for version control

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/khaleel1911/botrixai-url-shortener-frontend.git
cd botrixai-url-shortener-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
VITE_API_BASE_URL=your_backend_api_url
VITE_OAUTH_REDIRECT_URL=your_oauth_redirect_url
```

> **Note:** Replace the placeholder values with your actual backend API URL and OAuth redirect URL.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

---

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── authService.js     # Authentication service
│   └── axios.js           # Axios configuration
│
├── assets/                 # Static assets
│   ├── BotrixAI_Dark.avif
│   ├── BotrixAI_Light.avif
│   └── card/              # Card images
│       ├── card-one.png
│       ├── card-two.png
│       └── card-three.png
│
├── components/            # Reusable React components
│   ├── Footer.jsx
│   ├── LeftCard.jsx
│   ├── Loginpage.jsx
│   ├── Navbar.jsx
│   ├── PrivateRoute.jsx
│   ├── ProtectedRoute.jsx
│   ├── RightCard.jsx
│   └── UrlMockDemo.jsx
│
├── constants/             # Application constants
│   └── data.js
│
├── hooks/                 # Custom React hooks
│   └── useHandleAuth.jsx
│
├── layout/                # Layout components
│   └── RootLayout.jsx
│
├── pages/                 # Page components
│   ├── AuthPage.jsx
│   ├── HistoryPage.jsx
│   ├── HomePage.jsx
│   ├── OAuthSuccessPage.jsx
│   ├── ProfilePage.jsx
│   └── UrlGeneratorPage.jsx
│
├── App.jsx                # Main application component
├── index.css              # Global styles
└── main.jsx               # Application entry point
```

---

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot-reload |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## ⚙️ Environment Configuration

The application requires the following environment variables:

- **`VITE_API_BASE_URL`** - Base URL for the backend API
- **`VITE_OAUTH_REDIRECT_URL`** - OAuth callback redirect URL

Create a `.env` file in the root directory and add these variables. The `.env` file should be added to `.gitignore` to prevent committing sensitive information.

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Branching Strategy

- Always create a feature branch from `main`
- Use descriptive branch names following the pattern:
  - `feature/feature-name` - For new features
  - `fix/bug-description` - For bug fixes
  - `refactor/component-name` - For code refactoring

**Examples:**
```bash
feature/auth-ui
feature/profile-page
fix/navbar-responsive
fix/oauth-redirect
```

### Workflow

1. **Never push directly to `main`** - All changes must go through Pull Requests
2. **Create a feature branch** - Use the naming conventions above
3. **Make your changes** - Write clean, maintainable code
4. **Submit a Pull Request** - Include a clear description of your changes
5. **Code Review** - All PRs require review before merging

### What NOT to Commit

The following files and directories should never be committed:

- `.env` - Environment variables
- `node_modules/` - Dependencies
- `/dist` - Build output
- IDE-specific files (`.vscode/`, `.idea/`, etc.)

Ensure these are listed in your `.gitignore` file.

---

## 📄 License

This project is developed by **BotrixAI**. All rights reserved.

---

## 👥 Built With

- **React** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing

---

**Built with passion and clean code by the BotrixAI team** 🚀
