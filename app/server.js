import express from "express";
import axios from "axios";

const app = express();

app.set("view engine", "ejs");
app.use(express.json());

const CLIENT_ID = "ma7lw2lam42g3eih1e4l5913vad4up";
const OAUTH_REDIRECT_URL = "http://localhost:3000/oauth";

const query = {
  client_id: CLIENT_ID,
  redirect_uri: OAUTH_REDIRECT_URL,
  response_type: "token+id_token",
  scope: "openid",
};

function generateAuthLoginURL() {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");
  return `https://id.twitch.tv/oauth2/authorize?${queryString}`;
}

app.get("/login", (req, res) => {
  res.send(generateAuthLoginURL());
});

app.get("/oauth", (req, res) => {
  //render with ejs
  res.render("oauth.ejs", {});
});
app.post("/oauth", async (req, res) => {
  getUserInfo(req.body.access_token);
});
app.listen(3000, () => {});

function getHeaders(accessToken) {
  return {
    Authorization: "Bearer " + accessToken,
    "Client-Id": CLIENT_ID,
  };
}

async function getUserInfo(accessToken) {
  const { data } = await axios.get("https://api.twitch.tv/helix/users", {
    headers: getHeaders(accessToken),
  });
}

function isUserIsSubscribedToChannel(accessToken, userId, broadcasterId) {
  return axios.get(
    `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${broadcasterId}&user`,
    {
      headers: getHeaders(accessToken),
    }
  );
}
