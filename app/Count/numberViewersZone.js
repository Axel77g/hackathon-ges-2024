import axios from "axios";
import { HTTPError } from "../Exceptions/HTTPError.js";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
    console.log('Un client s\'est connecté');

    // Écoutez l'événement 'viewerCount' envoyé depuis le frontend
    socket.on('viewerCount', (numberViewers) => {
        console.log('Nouveau nombre de téléspectateurs :', numberViewers);
        // Mettez à jour la valeur de numberViewers dans le fichier JSON ou la base de données
        updateViewerCount(numberViewers);
    });
});

// Fonction pour mettre à jour la valeur de numberViewers dans le fichier JSON ou la base de données
function updateViewerCount(numberViewers) {
    // Code pour mettre à jour le fichier JSON ou la base de données
}

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    WA.room.area.onEnter('jitsiChillZone').forEach(() => {
        numberViewers++;
        WA.room.area.get('jitsiChillZone').then(area => {
            // Vérifier si la zone existe
            console.log(WA.room.area.get('jitsiChillZOne'));
            console.log(area.properties);
            if (area) {
                // Mettre à jour la propriété 'numberViewers' de la zone
                area.setProperty('numberViewers', numberViewers);
                console.log(area);
                console.log("Nombre de téléspectateurs mis à jour :", numberViewers);
            } else {
                console.error("La zone 'jitsiChillZone' n'a pas été trouvée.");
            }
        });
        console.log(numberViewers);
    });

    WA.room.area.onLeave('jitsiChillZone').forEach( () => {
        numberViewers--;

        console.log(numberViewers);
    });

});