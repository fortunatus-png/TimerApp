# ========== STAGE 1: Build ==========
FROM node:22-alpine AS build

WORKDIR /app

# Copy only package.json first (better caching)
COPY package*.json ./
RUN npm install

# Copy the entire source code and build
COPY . .
RUN npm run build

# ========== STAGE 2: Serve mit Nginx ==========
FROM nginx:alpine

# Copy built files from Stage 1 into the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port 80 is Nginx's default port
EXPOSE 80

# Nginx starts automatically – no CMD needed