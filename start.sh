#!/bin/sh

echo "Starting container..."
echo "PORT environment variable: $PORT"

# Set default port if not provided
if [ -z "$PORT" ]; then
    export PORT=8080
    echo "No PORT env var found, using default: $PORT"
fi

echo "Configuring nginx to listen on port $PORT"

# Generate nginx config from template
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Generated nginx config:"
cat /etc/nginx/conf.d/default.conf

echo "Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "Nginx configuration is valid. Starting nginx..."
    exec nginx -g 'daemon off;'
else
    echo "Nginx configuration test failed!"
    exit 1
fi
