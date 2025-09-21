# Use Node 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all source code
COPY . .

# Ensure uploads directory exists (important for your images)
RUN mkdir -p /app/uploads

# Expose port (Fly expects 8080)
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
