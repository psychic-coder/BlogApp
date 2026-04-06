#Personal Tech Blog App

A full-stack personal tech blog platform built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). 

This repository features:
- **Backend**: Express.js REST API with JWT authentication (Hosted on Render.com).
- **Frontend**: React.js (Vite) with AI-powered content autocomplete (Hosted on Vercel).
- **Database**: MongoDB (Atlas).

---

## 📂 Project Structure

```text
BlogApp/
├── BlogAppFrontend/       # React/Vite frontend source (Vercel)
├── Backend/               # Express app, routes, controllers, models (Render.com)
├── vercel.json            # Vercel configuration for API proxying
├── .env.example           # Environment variable template
└── docs/                  # Project documentation
```

---

## 🛠 Local Development

### Prerequisites
- Node.js >= 14
- MongoDB (Local or Atlas)
- OpenAI API Key

### Steps

**1. Install all dependencies**
```bash
npm run install:all
```

**2. Set up environment**
Create `.env` in `Backend/` and `BlogAppFrontend/` using their respective `.env.example` templates.

**3. Start Development Servers**
Run both frontend and backend concurrently:
```bash
npm run dev
```

---

## 🚀 Deployment

### Backend (Render.com)

1. **Create a New Web Service** on Render.
2. **Connect your Repository** and set the **Root Directory** to `Backend`.
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Environment Variables**:
    - `MONGO`: Your MongoDB connection string.
    - `JWT_SECRET`: A secure random string.
    - `OPENAI_API_KEY`: Your OpenAI/OpenRouter API key.
    - `FRONTEND_URL`: Your Vercel frontend URL.

### Frontend (Vercel)

1. **Create a New Project** on Vercel.
2. **Standard Vercel Configuration**: 
    - Framework: Vite
    - Root Directory: `BlogAppFrontend`
3. **Build Command**: `npm run build`
4. **Environment Variables**:
    - `VITE_FIREBASE_API_KEY`: Your Firebase API key.
    - `VITE_API_BASE_URL`: `/api`
5. **Proxy Configuration**: 
    - Update `BlogAppFrontend/vercel.json` with your actual Render backend URL before deploying.

---

## ✨ Features

- **AI Autocomplete** — Write smarter with AI help.
- **JWT Auth** — Secure user accounts.
- **Admin Portal** — Manage your blog content and users.
- **Responsive UI** — Fully mobile-friendly.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

---

## 👤 Author

**Rohit Ganguly** — MERN stack developer.
