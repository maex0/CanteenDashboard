# Use a Node.js image as the base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy the package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Next.js app
RUN npm run build

# Prepare production image
FROM node:18-alpine

# Set working directory
WORKDIR /app


# Copy the package.json files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev


# Copy only the necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules


# Expose the port the Next.js server will run on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
