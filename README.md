# Webtech 210_FR

**Début de projet : Septembre 2024**

## Contributeurs

- Charles Lantigua Jorge - charleslantiguajorge@gmail.com
- Emmanuel Junior NGANSOM SILEU - emmanueljunior.ngansomsileu@edu.ece.fr

## Détails du projet

Réalisation d'un projet en langage JavaScript, HTML, et CSS.

## Modifications appliquées

### Suppression de `node_modules` de la gestion de version

Les étapes suivantes ont été suivies pour retirer le dossier `node_modules` du suivi Git, tout en continuant à l'ignorer dans le futur :

1. **Retirer `node_modules` de l'index Git et ajouter les modifications** :
   ```bash
   git rm -r --cached node_modules
   git add .
   git commit -m "Suppression de node_modules du suivi Git"
   git push origin main

2. **Pour ajouter les `node_modules` à notre dossier** : 
   ```bash
   node_modules/

### Création d'une nouvelle branche Git

Le but ici est de pouvoir mieux travailler en groupe et d'éviter les conflits au moment de fusionner nos codes sur la branche main 

1. **Création d'une nouvelle branche**

   ```bash 
   git checkout -b nom-de-la-branche

On peut ensuite push les modifications apporté vers le dépôt distant en suivant les méthodes de push classique 

2. **Fusionner avec la branche principale**
  ```bash
  git checkout main 
  git pull origin main 
  git merge nom-de-la-branche

3. **Supprimer la branche**
  git branch -d nom-de-la-branche


## Modules nécessaires au projet

1. **Node.js**
2. **Express.js**
3. **React.js**
4. **UUID**

## Ce qui a été modifié et ajouté

1. **Correction du commit pour la suppression de `node_modules`.**
2. **Ajout d'une section expliquant comment créer une nouvelle branche et basculer dessus.**
3. **Liste des modules nécessaires** : Node.js, Express, React, UUID.
4. **Instructions pour l'installation et l'exécution du projet.**

Les modifications ont lieu en TP, mais également en travaillant le projet en dehors des heures de cours.
