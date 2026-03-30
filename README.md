# Personal Tech Blog App

A full-stack personal tech blog platform built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). 

This repository features:
- **Backend**: Express.js REST API with JWT authentication.
- **Frontend**: React.js (Vite) with AI-powered content autocomplete.
- **Database**: MongoDB.
- **Infrastructure**: Docker & Docker Compose support.

---

## 📂 Project Structure

```text
BlogApp/
├── BlogAppFrontend/       # React/Vite frontend source
├── Backend/               # Express app, routes, controllers, models
├── docker-compose.yml    # Orchestrates app + MongoDB services
├── .env.example          # Environment variable template
├── package.json          # Root scripts for project management
└── docs/                 # Project documentation
```

---

## 🚀 Quick Start (Docker)

The quickest way to get the entire stack (app + MongoDB) running.

**1. Clone and Navigate**
```bash
git clone <your-repo-url>
cd BlogApp
```

**2. Environment Setup**
```bash
cp .env.example .env
```
Edit `.env` and provide your `JWT_SECRET` and other configuration.

**3. Launch**
```bash
docker-compose up --build
```
Visit **http://localhost:3000** to see the app.

---

## 🛠 Local Development (Manual)

### Prerequisites
- Node.js >= 14
- MongoDB (Local or Atlas)

### Steps

**1. Install all dependencies**
```bash
npm run install:all
```

**2. Set up environment**
Create `.env` in the root and in `Backend/` as needed.

**3. Start Development Servers**
You can run both frontend and backend concurrently from the root:
```bash
npm run dev
```

Alternatively, run them separately:
- **Backend**: `npm run dev:backend`
- **Frontend**: `npm run dev:frontend`

---

## ✨ Features

- **AI Autocomplete** — Leverage AI to help write blog titles and content.
- **JWT Auth** — Secure sign-up/sign-in and protected routes.
- **Post Management** — Full CRUD for blog posts.
- **Responsive UI** — Modern, mobile-friendly design.
- **Admin Portal** — Manage users, posts, and comments.

---

## 📄 Documentation

Detailed documentation can be found in the `docs/` folder:
- [API Reference](docs/API.md)
- [Contributing Guide](CONTRIBUTING.md)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

---

## 👤 Author

**Rohit Ganguly** — MERN stack developer passionate about technology and its role in society.
