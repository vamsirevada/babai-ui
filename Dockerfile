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

# Production stage
FROM nginx:alpine

# Install envsubst if not available
RUN apk add --no-cache gettext

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copy nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Set default port if not provided
ENV PORT=8080

# Use startup script
CMD ["/start.sh"]
