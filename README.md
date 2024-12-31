# Blogging Application - WebTech Project

## Description
Cette application de blog permet aux utilisateurs de créer, modifier et partager du contenu de manière intuitive. Elle offre une expérience utilisateur moderne avec authentification, gestion des commentaires et support du mode sombre/clair. Développée avec Next.js et Supabase, elle propose une interface responsive et sécurisée.

## Déploiement
- **Application** : [fall2024-webtech-210-saber11.vercel.app](https://fall2024-webtech-210-saber11.vercel.app/)
- **Base de données** : [Projet Supabase](https://mljwwromhlvzxeweayoa.supabase.co)

## Fonctionnalités
- 🔐 Chiffrement et déchiffrement de documents et de texte ( Base64, AES et RSA 4096)
- 📝 Création et édition d'articles avec éditeur WYSIWYG
- 🔑 Authentification et gestion des profils utilisateurs
- 💬 Système de commentaires
- ❤️ Interaction avec les commentaires une fois connecter
- 🔍 Recherche de contenu
- 🌓 Mode sombre/clair (à parti des paramètres)
- 🔒 Contrôle d'accès aux ressources
- 🌐 Intégration API externe (à partir de la barre de recherche)

## Prérequis Techniques
- Node.js (version 18+)
- npm ou yarn
- Compte Vercel (déploiement)
- Compte Supabase (base de données)

## Installation

```bash
# Cloner le projet
git clone https://github.com/mpgamer75/fall2024-webtech-210.git

# Installation des dépendances
npm install

# Configuration des variables d'environnement
cp .env.example .env.local

# Démarrer en développement
npm run dev
```

### Structure du projet 
```plaintext

📁 fall2024-webtech-210
├── app-cryptage/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   └── lib/
├── .dockerignore
├── .env.local
├── .eslintrc.json
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── package.json.backup
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── Changelog.md
```
# Guide d'Utilisation

## Publication d'Articles

1. Connectez-vous à votre compte
2. Accédez à "Nouvel Article"
3. Publiez votre contenu

## Gestion des Commentaires

* Commentez sur les articles
* Modérez vos commentaires  
* Interactions avec la communauté

## Personnalisation

* Modifiez votre profil
* Choisissez le mode d'affichage
* Gérez vos paramètres

## Technologies Utilisées

* **Frontend** : Next.js, React, Tailwind CSS
* **Backend** : Supabase
* **Déploiement** : Vercel
* **Autres** : WYSIWYG Editor, Gravatar (pas terminé)

## Auteurs

* Charles Lantigua Jorge 
* Emmanuel Ngansom

## Licence

Ce projet est développé dans le cadre du cours WebTech. Tous droits réservés.


# Mandatory Tasks Evaluation

## Code Structure and Quality

### **Naming convention**
* Grade: full
* Comments: Suivi strict des conventions de nommage avec utilisation cohérente du camelCase pour les variables/fonctions et PascalCase pour les composants React. Organisation claire des fichiers selon leur fonction.
* Task feedback: Tâche bien structurée qui a contribué à la maintenabilité du code.

### **Project structure**
* Grade: full
* Comments: Structure du projet optimisée suivant les bonnes pratiques Next.js avec séparation claire des composants, pages et utilitaires. Utilisation efficace des dossiers dédiés (components/, lib/, etc.)
* Task feedback: L'organisation modulaire facilite les développements futurs.

### **Git usage**
* Grade: full
* Comments: Utilisation systématique de branches features/, correctifs avec des commits atomiques et des messages descriptifs. Merge requests documentées.
* Task feedback: Workflow Git efficace qui a facilité la collaboration.

### **Code quality**
* Grade: full
* Comments: Code commenté, formaté (ESLint/Prettier), respect des principes DRY et SOLID. Tests unitaires implémentés pour les fonctions critiques.
* Task feedback: La qualité du code a permis d'éviter de nombreux bugs.

## Design and User Experience

### **Design, UX, and content**
* Grade: full
* Comments: Interface utilisateur intuitive et responsive avec Tailwind CSS. Animations fluides et feedback visuel pour les actions utilisateur.
* Task feedback: Le design moderne améliore l'expérience utilisateur.

### **Home page**
* Grade: full
* Comments: Page d'accueil claire présentant les derniers articles, système de tri et filtrage efficace. Optimisée pour le SEO.
* Task feedback: La page d'accueil remplit bien son rôle de vitrine.

### **Navigation**
* Grade: full
* Comments: Menu de navigation responsive, breadcrumbs, et liens contextels. Structure logique facilitant l'exploration du site.
* Task feedback: Navigation intuitive et ergonomique.

## User Features

### **Login and profile page**
* Grade: full
* Comments: Authentification sécurisée avec Supabase, gestion des sessions, page de profil personnalisable.
* Task feedback: Système d'authentification robuste.

### **Post creation and display**
* Grade: full
* Comments: Interface de création d'articles intuitive, prévisualisation en temps réel, affichage optimisé des contenus.
* Task feedback: Fonctionnalité centrale bien implémentée.

### **Comment creation and display**
* Grade: moyen
* Comments: Système de commentaires basique implémenté. La modération et les réponses imbriquées n'ont pas pu être finalisées.
* Task feedback: Fonctionnalité partiellement implémentée par manque de temps.

### **Post modification and removal**
* Grade: full
* Comments: Édition et suppression des articles avec confirmation, historique des modifications.
* Task feedback: Gestion complète du cycle de vie des articles.

### **Search**
* Grade: full
* Comments: Recherche full-text performante, filtres avancés, suggestions de recherche.
* Task feedback: Fonctionnalité de recherche efficace.

## Technical Features

### **Use an external API**
* Grade: full
* Comments: Intégration d'APIs externes pour enrichir le contenu (météo, actualités).
* Task feedback: Les APIs externes ajoutent de la valeur au projet.

### **Resource access control**
* Grade: full
* Comments: Système de permissions granulaire, protection des routes et des ressources.
* Task feedback: Sécurité bien gérée.

### **Account settings**
* Grade: full
* Comments: Page de paramètres complète avec gestion des préférences utilisateur.
* Task feedback: Personnalisation poussée du compte utilisateur.

### **WYSIWYG integration**
* Grade: none
* Comments: Début d'intégration de l'éditeur WYSIWYG mais fonctionnalités limitées.
* Task feedback: Fonctionnalité non finalisée.

### **Gravatar integration**
* Grade: none 
* Comments: Non implémenté par manque de temps.
* Task feedback: Fonctionnalité non réalisée.

### **Light/dark mode**
* Grade: full
* Comments: Thème sombre/clair avec détection automatique des préférences système et persistance du choix.
* Task feedback: Mode sombre bien intégré et apprécié des utilisateurs.

## Total
* **Commentaire général** : Projet bien réalisé avec la majorité des fonctionnalités implémentées. Seuls les commentaires, l'éditeur WYSIWYG et Gravatar n'ont pas pu être finalisés par manque de temps.

# Bonus Tasks

## **Système de Like/Dislike**
* Grade: full
* Comments: Implementation d'un système de réactions aux commentaires et articles :
 * Utilisation de Supabase Real-time pour les mises à jour en direct
 * Animation fluide des compteurs de likes
 * Historique des likes par utilisateur
 * Statistiques visibles sur le profil utilisateur
 * Protection contre le spam de likes

## **Dockerisation du Projet**
* Grade: full
* Comments: Mise en place complète de Docker pour le développement et la production :
 * Configuration multi-conteneurs avec `docker-compose.yml`
 * Images optimisées et légères
 * Volumes pour la persistance des données
 * Hot-reload en développement
 * Documentation détaillée du setup Docker
 * Scripts de déploiement automatisés

## Total Points Bonus
* **Commentaire général** : Ces fonctionnalités bonus ajoutent une réelle valeur au projet :
 * Le système de likes améliore l'engagement des utilisateurs
 * La dockerisation facilite le déploiement et la maintenance