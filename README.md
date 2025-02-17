# Slack App

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé les outils suivants :

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

## Ports utilisés

L'application utilise les ports suivants :

- **3000** : Frontend
- **5000** : Backend
- **8080** : Gestion de base de données
- **80** : Nginx
- **Mysql** : 3306

## Installation et démarrage

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/andrianina4/slack
   ```
2. Accédez au dossier du projet :
   ```sh
   cd slack
   ```
3. Lancez l'application avec Docker :
   ```sh
   export COMPOSE_PROJECT_NAME=novity-slack && docker-compose down -v &&  echo "Création de votre environment" && docker-compose --env-file .env up -d --build
   ```

## Accès à l'application

- App : [http://localhost](http://localhost)
- Adminer : [http://localhost/adminer](http://localhost/adminer)

## Arrêt de l'application

Pour arrêter et supprimer les conteneurs Docker, utilisez :

```sh
docker-compose down
```

## Configuration des mots de passe

L'application nécessite des mots de passe pour certaines fonctionnalités sensibles. Assurez-vous de configurer un fichier d'environnement `.env` avec les variables nécessaires, par exemple :

```env
DB_NAME=novity
DB_PASSWORD=admin
```

## Licence

Ce projet est sous licence MIT.
