# ─── Stage 1: Build the React/Vite frontend ───────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app/BlogAppFrontend

# Install frontend dependencies
COPY BlogAppFrontend/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY BlogAppFrontend/ ./
RUN npm run build


# ─── Stage 2: Production Express server ───────────────────────────────────────
FROM node:20-alpine AS runtime

WORKDIR /app

# Install backend dependencies (production only)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY api/ ./api/
COPY bin/ ./bin/

# Copy built frontend from stage 1
COPY --from=build /app/BlogAppFrontend/dist ./BlogAppFrontend/dist

# Expose the port the Express app listens on
EXPOSE 3000

# Start the server
CMD ["node", "./bin/www"]
