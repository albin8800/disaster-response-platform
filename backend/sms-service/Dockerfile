# ----------------------------------------------------
# Stage 1: Build & Compile TypeScript
# ----------------------------------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies needed for compiling)
RUN npm ci

# Copy source code
COPY src/ ./src

# Compile TypeScript to JavaScript in /app/dist
RUN npm run build

# ----------------------------------------------------
# Stage 2: Lean Production Runtime
# ----------------------------------------------------
FROM node:24-alpine AS runner
  
    WORKDIR /app
  
    ENV NODE_ENV=production
    ENV PORT=3000
  
    # Install ONLY production dependencies to keep image lean
    COPY package*.json ./
    RUN npm ci --omit=dev
  
    # Copy only the compiled output from the builder stage
    COPY --from=builder /app/dist ./dist
  
    # Security best practice: Run container as non-root user
    USER node
  
    EXPOSE 3000
  
    CMD ["node", "dist/server.js"]    
