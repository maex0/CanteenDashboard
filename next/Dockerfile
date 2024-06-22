# Base Node.js image for building
FROM node:22-alpine AS base

RUN apk update && apk add --no-cache curl

# Create a non-root user and group
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# Set working directory
WORKDIR /app

# Copy package files to the base stage
COPY package*.json ./

# Change ownership of the package files to the non-root user
RUN chown -R nonroot:nonroot /app

# Switch to the non-root user
USER nonroot

# Install all dependencies in the base stage
RUN npm install --ignore-scripts

# Copy only necessary files for the build
COPY src ./src
COPY prisma ./prisma
COPY next.config.mjs ./
COPY tsconfig.json ./

# Change ownership of all files to non-root user
USER root
RUN chown -R nonroot:nonroot /app

# Switch back to non-root user
USER nonroot

# Generate Prisma Client
RUN npx prisma generate

# Set the environment variable for development mode
ENV NODE_ENV=production

# Build the Next.js app
RUN npm run build

# Production Image (final stage)
FROM node:18-alpine AS prod

RUN apk update && apk add --no-cache curl

# Create a non-root user and group
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Change ownership of the package files to the non-root user
RUN chown -R nonroot:nonroot /app

# Switch to the non-root user
USER nonroot

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Copy production artifacts from the base stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules

# Copy the .env.local file
COPY .env.production ./

# Expose the port the Next.js server will run on
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["npm", "run", "start"]

# Development Image
FROM node:18-alpine AS dev

# Create a non-root user and group
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Change ownership of the package files to the non-root user
RUN chown -R nonroot:nonroot /app

# Switch to the non-root user
USER nonroot

# Copy only necessary files for the build
COPY src ./src
COPY prisma ./prisma
COPY next.config.mjs ./
COPY tsconfig.json ./

# Install all dependencies
RUN npm install --ignore-scripts

# Generate Prisma Client
RUN npx prisma generate

# Set the environment variable for development mode
ENV NODE_ENV=development

# Copy the .env.local file
COPY .env.local ./

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js server in development mode
CMD ["npm", "run", "dev"]