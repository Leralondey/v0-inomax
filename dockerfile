# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app source (y compris le dossier prisma)
COPY . .

# AJOUTER CETTE LIGNE CI-DESSOUS
# Génère le client Prisma pour qu'il soit disponible pour le build
RUN npx prisma generate

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]