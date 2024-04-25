/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
//import { RemotePlayerInterface } from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

let currentPopup: any = undefined;
let numberViewers: number = 0;

// Attendre que l'API soit prête
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    // Configurer le suivi des joueurs
    WA.players.configureTracking();

    // Détecter l'entrée dans la zone 'clock'
    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time + " - Viewers: " + numberViewers, []);
        console.log(currentPopup);
    });

    // Détecter l'entrée dans la zone 'jitsiChillZone'
    WA.room.area.onEnter('jitsiChillZone').subscribe(() => {
        console.log('Entering jitsiChillZone');

        // Incrémenter le nombre de téléspectateurs pour chaque joueur dans la liste
        let players = WA.players.list();
        for (let player of players ) {
            numberViewers++;
            console.log('les joueurs',players, player);
        }

        console.log('Number of viewers after entering:', numberViewers);

        // Sauvegarder le nombre de téléspectateurs
        WA.state.saveVariable('varNumber', {
            'default': numberViewers
        });
    });

    // Détecter la sortie de la zone 'jitsiChillZone'
    WA.room.area.onLeave('jitsiChillZone').subscribe(() => {
        console.log('Leaving jitsiChillZone');
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

        console.log('Number of viewers after leaving:', numberViewers);

        // Sauvegarder le nombre de téléspectateurs
        WA.state.saveVariable('varNumber', {
            'default': numberViewers
        });
    });

    // Détecter la sortie de la zone 'clock'
    WA.room.area.onLeave('clock').subscribe(closePopup);

    // Initialisation de la bibliothèque Scripting API Extra
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};