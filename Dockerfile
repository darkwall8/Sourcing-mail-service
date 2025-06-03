# Use the latest LTS version of Node.js
FROM node:20.19
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./

# Copy .env
COPY .env /app/.env
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 4000
 
# Define the command to run your app
CMD ["npm", "run", "dev"]