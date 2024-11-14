# Changelog

## [Unreleased]

### Changements effectués :
- **Changement de branche** : Vous avez effectué un changement de branche et résolu des divergences entre votre branche locale et la branche distante. Cela a impliqué la récupération de nouveaux commits distants et la résolution de conflits.
  
- **Réorganisation du projet** :  
  - Les fichiers de configuration comme `.eslintrc.json`, `jsconfig.json`, et d'autres ont été déplacés dans un répertoire `/config` pour une meilleure organisation du projet.
  - Un nouveau répertoire `docker` a été créé pour contenir les fichiers spécifiques à Docker (`Dockerfile`, `docker-compose.yaml`), dans le but de structurer davantage les fichiers liés à la configuration des containers.

- **Mise à jour des chemins d'importation** :  
  Les chemins d'importation dans les fichiers ont été modifiés pour s'adapter à la nouvelle structure du projet, afin que les modules et fichiers puissent être correctement référencés.

- **Mise à jour des fichiers Docker** :  
  Les fichiers Docker, notamment le `Dockerfile` et le `docker-compose.yaml`, ont été mis à jour pour refléter la nouvelle organisation du projet. Ces modifications ont permis d'ajuster les configurations des containers Docker en fonction des nouveaux chemins et répertoires.

- **Résolution de conflits de fusion** :  
  Vous avez résolu plusieurs conflits de fusion dans des fichiers importants comme `README.md`, `Dockerfile`, et `package.json`. Ces conflits ont été causés par des divergences entre les commits locaux et distants, mais ont été résolus pour permettre une intégration propre des modifications.

- **Suppression de fichiers obsolètes** :  
  Certains fichiers, comme des fichiers de configuration et des images, ont été supprimés du projet après avoir vérifié qu'ils n'étaient plus nécessaires pour la structure actuelle du projet. Cela comprend des fichiers comme `Changelog.md` et certains fichiers Docker obsolètes.

### Docker :
- **Configuration des containers Docker** :  
  Vous avez ajouté un `Dockerfile` et un fichier `docker-compose.yaml` pour configurer l'environnement Docker du projet. Cela permet de faciliter le déploiement et la gestion des containers nécessaires pour exécuter l'application dans un environnement contrôlé.

### Documentation :
- **Mise à jour du README** :  
  Le fichier `README.md` a été mis à jour pour refléter les changements dans l'organisation du projet, les nouvelles structures de répertoires, et les instructions de configuration et d'installation des containers Docker.
