/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
//import { RemotePlayerInterface } from "@workadventure/iframe-api-typings";

console.log("Script started successfully");

let numberViewers: number = 0;
let currentPopup: any = undefined;
// Attendre que l'API soit prête
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    /**
     * Redirige les joueurs non connectés vers la salle d'accueil si il n'y est pas
     */
    function handleNotConnected() {
      if (
        !WA.room.mapURL.replace("github", "").includes("hub") &&
        !WA.player.tags.some((tag) => tag.startsWith("subscribed"))
      ) {
        let id = WA.room.id.replace("https://play.workadventu.re", "");
        WA.nav.goToRoom(id.replace(/(.+\/).+/, "hub"));
      }
    }
    /**
     * Ajoute un role temporaire pour ouvrir la porte
     */
    function handleConnected() {
      console.log("Connected set temporary role");
      WA.player.tags.push("subscribed_temp");
      if (!WA.player.tags.some((tag) => tag == "member")) {
        WA.player.tags.push("member");
      }
    }

    /**
     * Event emis par l'iframe login lorsque la connexion est terminée
     */
    WA.event.on("connectionState").subscribe((event) => {
      if (event.data == WA.player.uuid) handleConnected();
    });
    handleNotConnected();

    // Configurer le suivi des joueurs
    WA.players.configureTracking();

    // Détecter l'entrée dans la zone 'live'
    WA.room.area.onEnter("liveArea1").subscribe(() => {
      console.log("liveArea1");

      // Incrémenter le nombre de téléspectateurs pour chaque joueur dans la liste
      let players = WA.players.list();
      for (let player of players) {
        numberViewers++;
        console.log("les joueurs", players, player);
      }

      console.log("Number of viewers after entering:", numberViewers);

      // Sauvegarder le nombre de téléspectateurs
      WA.state.saveVariable("varNumber1", {
        default: numberViewers,
      });
    });

    WA.room.area.onEnter("liveArea2").subscribe(() => {
      console.log("liveArea2");

      // Incrémenter le nombre de téléspectateurs pour chaque joueur dans la liste
      let players = WA.players.list();
      for (let player of players) {
        numberViewers++;
        console.log("les joueurs", players, player);
      }

      console.log("Number of viewers after entering:", numberViewers);

      // Sauvegarder le nombre de téléspectateurs
      WA.state.saveVariable("varNumber2", {
        default: numberViewers,
      });
    });

    WA.room.area.onEnter("liveArea3").subscribe(() => {
      console.log("liveArea3");

      // Incrémenter le nombre de téléspectateurs pour chaque joueur dans la liste
      let players = WA.players.list();
      for (let player of players) {
        numberViewers++;
        console.log("les joueurs", players, player);
      }

      console.log("Number of viewers after entering:", numberViewers);

      // Sauvegarder le nombre de téléspectateurs
      WA.state.saveVariable("varNumber3", {
        default: numberViewers,
      });
    });

    // Détecter la sortie de la zone 'jitsiChillZone'
    WA.room.area.onLeave("liveArea1").subscribe(() => {
      console.log("Leaving liveArea1");
      numberViewers = 0;
      // Décrémenter le nombre de téléspectateurs pour chaque joueur dans la liste
      let players = WA.players.list();
      for (let player of players) {
        numberViewers++;
        console.log(player);
      }

      // S'assurer que le nombre de téléspectateurs ne devienne pas négatif
      if (numberViewers < 0) {
        numberViewers = 0;
      }

      console.log("Number of viewers after leaving:", numberViewers);

      // Sauvegarder le nombre de téléspectateurs
      WA.state.saveVariable("varNumber1", {
        default: numberViewers,
      });
    });

    // Détecter la sortie de la zone 'jitsiChillZone'
    WA.room.area.onLeave("liveArea2").subscribe(() => {
      console.log("Leaving liveArea2");
      numberViewers = 0;
      // Décrémenter le nombre de téléspectateurs pour chaque joueur dans la liste
      let players = WA.players.list();
      for (let player of players) {
        numberViewers++;
        console.log(player);
      }

      // S'assurer que le nombre de téléspectateurs ne devienne pas négatif
      if (numberViewers < 0) {
        numberViewers = 0;
      }

      console.log("Number of viewers after leaving:", numberViewers);

      // Sauvegarder le nombre de téléspectateurs
      WA.state.saveVariable("varNumber2", {
        default: numberViewers,
      });
    });

    // Détecter la sortie de la zone 'jitsiChillZone'
    WA.room.area.onLeave("liveArea3").subscribe(() => {
      console.log("Leaving liveArea3");
      numberViewers = 0;
      // Décrémenter le nombre de téléspectateurs pour chaque joueur dans la liste
      let players = WA.players.list();
      for (let player of players) {
        numberViewers++;
        console.log(player);
      }

      // S'assurer que le nombre de téléspectateurs ne devienne pas négatif
      if (numberViewers < 0) {
        numberViewers = 0;
      }

      console.log("Number of viewers after leaving:", numberViewers);

      // Sauvegarder le nombre de téléspectateurs
      WA.state.saveVariable("varNumber3", {
        default: numberViewers,
      });
    });

    WA.room.onEnterLayer("openDoorZone").subscribe(() => {
      if (WA.player.tags.some((tag) => tag.startsWith("subscribed"))) {
        WA.room.showLayer("above/openDoor");
        WA.room.hideLayer("closeDoor");
      } else {
        WA.room.hideLayer("above/openDoor");
        WA.room.showLayer("closeDoor");
      }
    });

    WA.room.area.onEnter("connexion_popup").subscribe(() => {
      if (!WA.player.tags.some((tag) => tag == "member")) {
        currentPopup = WA.ui.openPopup(
          "message",
          "Vous devez être connecté à un compte WorkAdventure pour entrer",
          []
        );
      } else if (!WA.player.tags.some((tag) => tag.startsWith("subscribed"))) {
        currentPopup = WA.ui.openPopup(
          "message",
          "Vous devez être connecté à twitch et être abonné pour entrer",
          []
        );
      }
    });
    WA.room.area.onLeave("connexion_popup").subscribe(closePopup);

    WA.room.area.onEnter("liveAreaPopup1").subscribe(() => {
      currentPopup = WA.ui.openPopup("livePopup1", "Zone de live", []);
    });
    WA.room.area.onLeave("liveAreaPopup1").subscribe(closePopup);

    WA.room.area.onEnter("liveAreaPopup2").subscribe(() => {
      currentPopup = WA.ui.openPopup("livePopup2", "Zone de live", []);
    });
    WA.room.area.onLeave("liveAreaPopup2").subscribe(closePopup);

    WA.room.area.onEnter("liveAreaPopup3").subscribe(() => {
      currentPopup = WA.ui.openPopup("livePopup3", "Zone de live", []);
    });
    WA.room.area.onLeave("liveAreaPopup3").subscribe(closePopup);

    WA.room.area.onEnter("RediffClipAreaPopup").subscribe(() => {
      currentPopup = WA.ui.openPopup("RediffClipPopup", "Rediffs et clips", []);
    });
    WA.room.area.onLeave("RediffClipAreaPopup").subscribe(closePopup);

    // Initialisation de la bibliothèque Scripting API Extra
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

function closePopup() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

export {};
