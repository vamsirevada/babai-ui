# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - Use a simpler approach
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy simple nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a startup script that handles the PORT variable
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'sed -i "s/listen 8080/listen $PORT/g" /etc/nginx/conf.d/default.conf' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Start with our script
CMD ["/start.sh"]
