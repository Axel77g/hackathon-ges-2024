# Hackathon GES 20224 - Groupe 3

> BOULAHNINE Yassine, DIALLO  Abdoulaye, GODEFROY Axel, MARTINEZ ALVES Laura, NEVEU Gary,YOPA Leonc

Projet accesible a l'addresse suivante : https://play.workadventu.re/@/esgi-1713899647/testing/hub



## Lancer le projet en local (déconseillé)

### Préparer votre environement
Vous devez avant toute chose installer un certificat SSL sur votre localhost, il est obligatoire pour le fonctionnement des cookies tiers utilisé pour faire fonctionner le login avec twitch : pour se faire vous pouvez suivre [ce guide](https://web.dev/articles/how-to-use-local-https?hl=fr).

Par la suite vous pouvez configuré le `app/.env` 
voici un exemple
```
```

### Modifier la map pour pointer vers votre serveur local

Pour lancer en local le projet vous devez modifier le fichier `hub.tmj` et remplacer toutes les occurance de `hackathon.axelgodefroy.fr` par `localhost:3000` puis lancer les commandes : 
```bash
npm run dev
```
et 
```
npm run dev:server
```

Rendez-vous sur localhost:5173 pour accéder a la map.
