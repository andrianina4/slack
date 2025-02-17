#!/bin/sh
export COMPOSE_PROJECT_NAME=novity-slack
docker-compose down -v
# # # Remove the bind mount directory
# sudo rm -rf ./mysql_data

#  Start the containers again
echo "Création de votre environment"
docker-compose --env-file .env up -d --build