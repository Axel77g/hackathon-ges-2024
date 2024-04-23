import express from "express";
const app = express();

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
  res.send(req.query);
});
app.listen(3000, () => {});
