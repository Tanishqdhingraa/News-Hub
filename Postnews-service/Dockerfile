# ---------------------------
# 🏗️  Stage 1: Build Stage
# ---------------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy rest of the application
COPY . .

# ---------------------------
# 🚀  Stage 2: Runtime Stage
# ---------------------------
FROM node:18-alpine

WORKDIR /app

# Copy node_modules and source code from builder
COPY --from=builder /app /app

# Expose the port your app runs on
EXPOSE 5002

# Set environment variables (you can override in docker-compose or .env)
ENV NODE_ENV=production

# Start the service
CMD ["node", "server.js"]
