# Foo imager

Foo imager is MIT-licensed open source project. It allows generating dummy images for testing.

Available formats that can be generated:

png
gif
jpg
svg

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
# Foo Imager

Generates dummy images with any size.

## Project deploy

## Setup

1. (Optional) If you need to configure a secure connection and obtain a certificate from Let's Encrypt, it can be easily
 done with [https://github.com/evertramos/docker
-compose-letsencrypt-nginx-proxy-companion][Web Proxy using Docker, NGINX and Let's Encrypt]. Please follow
 instructions from the repository.
2. There are two options to run the project with Let's encrypt certificates or without. To run with certificates execute
`.start.sh` script. Or create a network `docker network create -d bridge foo-imager-network` and run docker
-compose `docker-compose up -d`.
