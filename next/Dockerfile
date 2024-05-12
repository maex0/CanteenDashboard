# Base Node.js image for building
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files to the base stage
COPY package*.json ./

# Install all dependencies in the base stage
RUN npm install --ignore-scripts

# Copy all project files to the base stage
COPY . .

# Build the Next.js app
RUN npm run build

# Production Image (final stage)
FROM node:18-alpine AS prod

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Copy production artifacts from the base stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules

# Expose the port the Next.js server will run on
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["npm", "run", "start"]

# Development Image
FROM base AS dev

# Set the environment variable for development mode
ENV NODE_ENV=development

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js server in development mode
CMD ["npm", "run", "dev"]
