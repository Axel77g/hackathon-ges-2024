/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
//import { RemotePlayerInterface } from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Attendre que l'API soit prête
WA.onInit().then(() => {
    console.log('Scripting API ready');

    WA.room.area.onEnter('connexion_popup').subscribe(() => {
        if(!WA.player.tags.includes("subscribed_1000")) {
            currentPopup = WA.ui.openPopup("message", "Vous devez vous être connecté pour entrer", []);
        }
    })
    WA.room.area.onLeave('connexion_popup').subscribe(closePopup);

    WA.room.area.onEnter('liveAreaPopup1').subscribe(() => {
        currentPopup = WA.ui.openPopup("livePopup1", "Zone de live", []);
    })
    WA.room.area.onLeave('liveAreaPopup1').subscribe(closePopup);

    WA.room.area.onEnter('liveAreaPopup2').subscribe(() => {
        currentPopup = WA.ui.openPopup("livePopup2", "Zone de live", []);
    })
    WA.room.area.onLeave('liveAreaPopup2').subscribe(closePopup);

    WA.room.area.onEnter('liveAreaPopup3').subscribe(() => {
        currentPopup = WA.ui.openPopup("livePopup3", "Zone de live", []);
    })
    WA.room.area.onLeave('liveAreaPopup3').subscribe(closePopup);

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