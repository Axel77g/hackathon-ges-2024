function bootstrapLogin() {
  let tries = 0;
  WA.onInit().then(async () => {
    const link = document.getElementById("link");
    const base64UUID = btoa(WA.player.uuid);
    link.href = link.href + "&state=" + base64UUID;

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
            window.location.href = "/success";
            WA.event.broadcast("connectionState", WA.player.uuid);
          }
        });
      tries++;
      await new Promise((resolve) => setTimeout(resolve, 3000));
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
