# SABER - Application de Cryptage Sécurisée

### Composants Principaux
- `Navigation.js` - Barre de navigation responsive
- `EncryptForm.js` - Formulaire de cryptage
- `DecryptForm.js` - Formulaire de décryptage
- `AuthForm.js` - Gestion authentification

### Pages
- `/` - Accueil
- `/encrypt` - Cryptage
- `/decrypt` - Décryptage
- `/blog` - Articles et actualités
- `/settings` - Paramètres utilisateur

### Technologies Utilisées
- Next.js 15.0.3
- Tailwind CSS 
- Supabase (Auth & DB)
- CryptoJS (Cryptographie)
- React Icons

### Fonctionnalités de Sécurité
- Authentification utilisateur
- Cryptage AES-256 (à venir)/ RSA/ B
- Protection contre XSS
- Validation des entrées

### Base de Données
Tables Supabase :
- `users` - Données utilisateurs
- `posts` - Articles blog
- `comments` - Commentaires blog
- `likes` - Interactions utilisateurs

### Scripts
```bash
npm run dev     # Développement
npm run build   # Production build
npm run start   # Lancement production
```
### Docker 
Implémentation de docker pour mieux développer l'application en groupe 
# Commandes: 
```bash
docker build
docker start
docker stop
docker-compose up
docker-compose down 
docker ps
docker logs
```



