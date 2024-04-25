/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags);
    WA.player.tags.push('subscribed_1000');

    console.log(WA.room);

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup);

    WA.room.area.onEnter('connexion_popup').subscribe(() => {
        if(!WA.player.tags.includes("subscribed_1000")) {
            currentPopup = WA.ui.openPopup("message", "Vous devez vous être connecté pour entrer", []);
        }
    })
    WA.room.area.onLeave('connexion_popup').subscribe(closePopup);

    WA.room.onEnterLayer('openDoorZone').subscribe(() => {
        if(WA.player.tags.includes('subscribed_1000')) {
            WA.room.showLayer('above/openDoor');
            WA.room.hideLayer('closeDoor');
        } else {
            WA.room.hideLayer('above/openDoor');
            WA.room.showLayer('closeDoor');
        }
    })
    

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
