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
id_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ.eyJhdWQiOiJtYTdsdzJsYW00MmczZWloMWU0bDU5MTN2YWQ0dXAiLCJleHAiOjE3MTM4NzgzMTUsImlhdCI6MTcxMzg3NzQxNSwiaXNzIjoiaHR0cHM6Ly9pZC50d2l0Y2gudHYvb2F1dGgyIiwic3ViIjoiNjg3NzY1NDAiLCJhdF9oYXNoIjoienNFa19Ua2t6dF9zWDl4NW1qOFJaQSIsImF6cCI6Im1hN2x3MmxhbTQyZzNlaWgxZTRsNTkxM3ZhZDR1cCIsInByZWZlcnJlZF91c2VybmFtZSI6IkF4ZUxpaWl0b29vIn0.5kR19HMTjzD4a397ibSkxmfPTDtUWrvfg08XZNdd4e9KPmibAlbxqmm2dcxciyrKn7LXcwLwkM-mOUBG26yXkUpLgqB6eEPeh5U9hHYbGBDp5tc1j_lDl_WrtLKPVop3BJE7tGwrl2uiNKFhPbCDvNkcDk63lGdZVzJK-y6VqyKn6KHCj4FhJ25b7dSe0tzkSPxqx7QmEGJ75Vt2WIYtVaaTiSbF2j-sMsXCIfeZH2Cinuhb_8Vjgv7-OPfFctFGfT2g5nmF3j74IXw8SRCjRf_Gxz9Z0OkDA15j0U2PQ7l4VtKqbJmjhuFcT_1QCc7fcGr5NSzIgtPiqsOY46tJtg",
  8;

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
    `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${broadcasterId}`,
    {
      headers: getHeaders(accessToken),
    }
  );
}
