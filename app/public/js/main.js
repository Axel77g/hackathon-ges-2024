/**
 * Ce fichier est charger dans plusieurs pages de l'application mais les fonctions sont ciblé par url
 */
/**
 * Récupere le uuid du membre et le converti en base64 pour mettre a jours le lien de connexion twitch
 * Verifie si le membre est connecté toute les 3 secondes pour 20 essais
 * Si le membre est connecté, redirige vers /success
 * Envoie un event pour mettre a jours l'etat de connexion du membre (/src/main.tsx)
 * @call /login
 */
const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

async function bootstrapLogin() {
  let tries = 0;
  WA.onInit().then(async () => {
    const link = document.getElementById("link");
    const input = document.getElementById("email");
    if (WA?.player?.isLogged) {
      if (WA.player.uuid.match(EMAIL_REGEX)) {
        input.value = WA.player.uuid;
      }

      //ajoute le uuid du membre en base64 au lien de connexion twitch
      link.setAttribute("disabled", false);
      link.addEventListener("click", (e) => {
        e.preventDefault();

        if (!input.value.match(EMAIL_REGEX)) {
          alert("Veuillez entrer une adresse email valide");
          return;
        }
        const payload = {
          uuid: WA.player.uuid,
          name: WA.player.name,
          email: input.value,
        };

        const base64Payload = btoa(JSON.stringify(payload));
        let url = link.href + "&state=" + base64Payload;
        window.location.href = url;
      });
      //verification de la connexion
      while (tries < 20) {
        fetch("/is-connected", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uuid: WA.player.uuid }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.connected) {
              WA.event.broadcast("connectionState", WA.player.uuid);
              window.location.href = "/success";
            }
          });
        tries++;
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } else {
      link.href = "#";
      link.style.opacity = 0.5;
      link.addEventListener("click", (e) => {
        e.preventDefault();
      });
      link.innerHTML = "Vous devez être connecté a Workadventure";
    }
  });
}

const url = {
  "/login": bootstrapLogin,
};

(() => {
  const path = window.location.pathname;

  if (url[path]) {
    url[path]();
  }
})();
