# Hackathon GES 20224 - Groupe 3

> BOULAHNINE Yassine, DIALLO  Abdoulaye, GODEFROY Axel, MARTINEZ ALVES Laura, NEVEU Gary,YOPA Leonc

## Stack du projet

Le projet se base sur le start-kit de Workadventure, qui a été proposé en `TypeScript`.
Nous avons aussi une partie backend présente dans `./app/` dévelopé en `NodeJS` et en utilisant le framework `express` ainsi que quelques librairies comme `express-session`, `axios` et le moteur de template `ejs`, ils ont été ajouté pour faciliter le développement.

## Tester le projet en ligne

Le projet est accesible à l'addresse suivante : https://play.workadventu.re/@/esgi-1713899647/testing/hub

> ⚠️ nous avons authorisé l'accès à tous les comptes twitch peu importe les abonnements que le compte possède
```js 
if (isSubscribed || true) { // le || true permet d'autorisé tous les comptes
      const member = await UserServices.addRoleToMember(
        app.WA,
        memberID,
        "isSubscribed.tier"
      );
      req.session.user = {
        twitch: user,
        accessToken,
        member,
        isSubscribed: true,
      };
      req.session.save();
      res.render("success.ejs", { user: req.session.user, withContinue: true });
    } else {
      req.session.user = {
        twitch: user,
        accessToken,
        member: null,
        isSubscribed: false,
      };
      req.session.save();
      res.render("failure.ejs", {});
    }
```

## Lancer le projet en local

### Préparer votre environement

Vous devez avant toute chose installer un certificat SSL sur votre localhost, il est obligatoire pour le fonctionnement des cookies tiers utilisé pour faire fonctionner le login avec twitch : pour se faire vous pouvez suivre [ce guide](https://web.dev/articles/how-to-use-local-https?hl=fr).

Par la suite vous pouvez configuré le `app/.env` en suivant le `app/env.example`

Il vous faudrat avant:
- [Créer une application twitch pour faire une connexion SSO](https://dev.twitch.tv/console/apps)
- [Créer une application Workadventure](https://admin.workadventu.re/?view=developers)

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
