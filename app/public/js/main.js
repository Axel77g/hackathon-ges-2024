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
  WA.onInit().then(async () => {
    const link = document.getElementById("link");
    const base64UUID = btoa(WA.player.uuid);
    link.href = link.href + "&state=" + base64UUID;
  });
}

const url = {
  "/login": bootstrapLogin,
  "/oauth": boostrapOauthLogin,
};

(() => {
  const path = window.location.pathname;
  if (url[path]) {
    url[path]();
  }
})();
