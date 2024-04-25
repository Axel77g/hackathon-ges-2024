/**
 * Call by the oauth.ejs page (GET /oauth)
 */
function boostrapOauthLogin() {
  /**
   * get the paylaod from the request hash location
   * @returns <Object>
   */
  function extractOauthPayload() {
    const hash = window.location.hash.replace("#", "");
    const hashSplited = hash.split("&");
    return hashSplited.reduce((acc, current) => {
      const [key, value] = current.split("=");
      acc[key] = value;
      return acc;
    }, {});
  }

  const payload = extractOauthPayload();

  fetch("/oauth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "/oauth/success";
      } else {
        window.location.href = "/oauth/failure";
      }
    });
}

function bootstrapLogin() {
  let tries = 0;
  WA.onInit().then(async () => {
    const link = document.getElementById("link");
    const base64UUID = btoa(WA.player.uuid);
    link.href = link.href + "&state=" + base64UUID;

    while (tries < 20) {
      fetch("/is-connected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid: WA.player.uuid }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.connected) {
            window.location.href = "/player";
          }
        });
      tries++;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  });
}

function bootstrapOauthSuccess() {
  const channel = new BroadcastChannel("twitch");
  channel.postMessage({ success: true });
  console.log("Success");
}
const url = {
  "/login": bootstrapLogin,
  "/oauth": boostrapOauthLogin,
  "/oauth/success": bootstrapOauthSuccess,
};

(() => {
  const path = window.location.pathname;

  if (url[path]) {
    url[path]();
  }
})();
