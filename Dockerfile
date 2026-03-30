# ─── Stage 1: Build the React/Vite frontend ───────────────────
FROM node:20-alpine AS build

WORKDIR /app/BlogAppFrontend

# Install frontend dependencies
COPY BlogAppFrontend/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY BlogAppFrontend/ ./
RUN npm run build


# ─── Stage 2: Production Express server ─────────────────────
FROM node:20-alpine AS runtime

WORKDIR /app

# Install backend dependencies (production only)
WORKDIR /app/Backend
COPY Backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY Backend/api/ ./api/
COPY Backend/bin/ ./bin/
COPY Backend/public/ ./public/

# Copy built frontend from stage 1
WORKDIR /app
COPY --from=build /app/BlogAppFrontend/dist ./BlogAppFrontend/dist

# Expose the port the Express app listens on
EXPOSE 3000

# Start the server
WORKDIR /app/Backend
CMD ["node", "./bin/www"]
