# Use the official Node.js image as the base image
FROM node:22.14.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Actualizar npm
RUN npm install -g npm@11.1.0

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript a JavaScript
#RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm","run", "dev"]