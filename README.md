# Hackathon GES 2024 - Groupe 3

> BOULAHNINE Yassine, DIALLO Abdoulaye, GODEFROY Axel, MARTINEZ ALVES Laura, NEVEU Gary, YOPA Leonce

> Développeurs : BOULAHNINE Yassine, GODEFROY Axel, NEVEU Gary, YOPA Leonce

## Stack du projet

Le projet se base sur le start-kit de Workadventure, qui a été proposé en `TypeScript`.
Nous avons aussi une partie backend présente dans `./app/` développée en `NodeJS` et en utilisant le framework `express` ainsi que quelques librairies comme `express-session`, `axios` et le moteur de template `ejs`, ils ont été ajoutés pour faciliter le développement.

## Tester le projet en ligne

Le projet est accessible à l'adresse suivante : [https://play.workadventu.re/@/esgi-1713899647/testing/hub](https://play.workadventu.re/@/esgi-1713899647/testing/hub)

Vous devez être connecté à un compte Workadventure et non en tant qu'invité, dû à une contrainte de l'inbound API de WorkAdventure.

> ⚠️ Nous avons autorisé l'accès à tous les comptes Twitch peu importe les abonnements que le compte possède pour faciliter vos tests

```js
if (isSubscribed || true) { // le "|| true" permet d'autoriser tous les comptes Twitch connectés
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

### Préparer votre environnement

Avant toute chose, vous devez installer un certificat SSL sur votre localhost, il est obligatoire pour le fonctionnement des cookies tiers, ils sont utilisés afin de faire fonctionner le login avec twitch. Vous pouvez suivre les étapes de [ce guide](https://web.dev/articles/how-to-use-local-https?hl=fr).

Il vous faudra ensuite :
- [Créer une application Twitch pour faire une connexion SSO](https://dev.twitch.tv/console/apps), en spécifiant en redirect_uri https://localhost:3000/oauth
- [Créer une application Workadventure](https://admin.workadventu.re/?view=developers)

Avec cela, vous pourrez configurer le `app/.env` en suivant le `app/env.example`.

Installer les dépendances npm :

```bash
npm install
```

### Modifier la carte pour pointer vers votre serveur local

Pour lancer en local le projet, vous devez modifier le fichier `hub.tmj` et remplacer toutes les occurrences de `hackathon-ges.axelgodefroy.fr` par `localhost:3000`, puis lancer les commandes suivantes :

```bash
npm run dev
```
et 
```bash
npm run dev:server
```

Rendez-vous sur localhost:5173 pour accéder à la carte.

## Fonctionnalités & répartition des tâches

La porte d'accès : Gary NEVEU

Système de médailles + points : Gary NEVEU

Intégration Musiques :

Intégration Popups :

Intégration des iframes :

Login SSO Twitch : Axel GODEFROY

Vérification des rôles user : Axel GODEFROY

## Informations supplémentaires

Drive du projet (vidéo et schéma fonctionnel) : [Lien vers le drive](https://drive.google.com/drive/folders/120_ythLREKk3UEUBP5ln-gdCc53aP4VK?usp=sharing)

