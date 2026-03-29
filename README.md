# Personal Tech Blog App

A full-stack personal tech blog platform built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). The backend serves the REST API and the built React frontend as static files.

---

## 🚀 Running with Docker (Recommended)

This is the quickest way to get the entire stack (app + MongoDB) running with a single command.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

### Steps

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd BlogApp
```

**2. Set up environment variables**
```bash
cp .env.example .env
```
Open `.env` and fill in your values (at minimum set a strong `JWT_SECRET`):
```env
MONGO=mongodb://mongo:27017/blogapp
JWT_SECRET=your_long_random_secret_here
PORT=3000
```

**3. Build and start all services**
```bash
docker-compose up --build
```

This will:
- Build the React/Vite frontend
- Build the Express backend image
- Start a MongoDB container with a persistent volume
- Start the app server

**4. Open the app**

Visit **http://localhost:3000** in your browser.

### Useful Docker commands

| Command | Description |
|---|---|
| `docker-compose up --build` | Build images and start all services |
| `docker-compose up -d` | Start in detached (background) mode |
| `docker-compose down` | Stop and remove containers |
| `docker-compose down -v` | Stop containers and wipe the database volume |
| `docker-compose logs -f app` | Stream logs from the app container |

---

## 🛠 Running Locally (Without Docker)

### Prerequisites
- Node.js >= 14
- A running MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Steps

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd BlogApp
```

**2. Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

**3. Install backend dependencies**
```bash
cd Backend
npm install
```

**4. Build and install the frontend**
```bash
cd BlogAppFrontend
npm install
npm run build
cd ..
```

**5. Start the server**
```bash
npm start
```

Visit **http://localhost:3000**.

---

## 📁 Project Structure

```
BlogApp/
├── docker-compose.yml          # Orchestrates app + MongoDB services
├── .env.example                # Environment variable template
└── Backend/
    ├── Dockerfile              # Multi-stage build (frontend → backend)
    ├── api/                    # Express app, routes, controllers, models
    ├── bin/www                 # Server entry point
    └── BlogAppFrontend/        # React/Vite frontend source
```

---

## ✨ Features

- **Tech Insights** — Articles and analyses on emerging technologies
- **Personal Reflections** — Author perspectives on tech and society
- **User Auth** — JWT-based sign-up, sign-in, and session management
- **Post Management** — Create, edit, and delete blog posts
- **Comments** — Readers can comment on posts
- **Admin Dashboard** — Manage users and posts

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Rohit Ganguly** — MERN stack developer passionate about technology and its role in society.
