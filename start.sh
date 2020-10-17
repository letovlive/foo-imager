#!/usr/bin/env bash

# 1. Check if .env file exists
if [ -e .env ]; then
    source .env
else
    echo "It seems you didn´t create your .env file, so we will create one for you."
    cp .env.example .env
    # exit 1
fi

# 2. Create docker network
docker network create $APP_NETWORK

# 4. Connect to docker-compose-letsencrypt-nginx-proxy-companion
docker network connect $APP_NETWORK $NGINX_WEB
docker network connect $APP_NETWORK $DOCKER_GEN
docker network connect $APP_NETWORK $LETS_ENCRYPT

# 3. Start a container
docker-compose up -d
