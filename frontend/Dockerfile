# ========== STAGE 1: Build ==========
FROM node:22-alpine AS build

WORKDIR /app

# Nur package.json kopieren (für besseres Caching)
COPY package*.json ./
RUN npm install

# Den gesamten Quellcode kopieren und bauen
COPY . .
RUN npm run build

# ========== STAGE 2: Serve mit Nginx ==========
FROM nginx:alpine

# Die gebauten Dateien aus Stage 1 in den Nginx-Ordner kopieren
COPY --from=build /app/dist /usr/share/nginx/html

# Port 80 ist bei Nginx standardmäßig offen
EXPOSE 80

# Nginx startet automatisch – kein CMD nötig