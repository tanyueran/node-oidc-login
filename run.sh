#bash
docker pull node:16.14.0
docker rmi node-oidc-login
docker build -t node-oidc-login .
docker stop node-oidc-login && docker rm node-oidc-login
docker run --name node-oidc-login --network hydraguide -p 8099:8099 -d docker.io/node-oidc-login