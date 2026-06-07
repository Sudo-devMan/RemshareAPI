# --- STAGE 1: Build ---
FROM node:20-alpine AS builder

# Install pnpm globally inside the container
RUN npm install -g pnpm

WORKDIR /app

# Copy package management files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy the entire codebase
COPY . .

# Build the NestJS application (generates /dist)
RUN pnpm run build

# Remove development dependencies to keep the image light
RUN pnpm prune --prod

# --- STAGE 2: Execution ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy the bare minimum required to run the compiled NestJS code
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Start the NestJS API
CMD ["node", "dist/main"]
