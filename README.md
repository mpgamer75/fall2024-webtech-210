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
   git commit -m "Message"
   git push main <branch>

