# Use alpine node base image
FROM node:latest

# Set working directory inside the docker node
WORKDIR /app

# Copy package files and install dependencies
COPY . .
RUN npm install
RUN npm run build

# Expose the application port
EXPOSE 4321

# Command to run node.js in a docker container
CMD ["npm", "run", "preview"]
