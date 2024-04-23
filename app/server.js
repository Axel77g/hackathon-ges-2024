import "dotenv/config";
import express from "express";
import { HTTPError } from "./Exceptions/HTTPError.js";
import { Twitch } from "./lib/twitch.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    return await next();
  } catch (e) {
    if (e instanceof HTTPError) {
      res.status(e.status).send(e.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.get("/login", (req, res) => {
  res.redirect(Twitch.oauthURL);
});

app.get("/oauth", (req, res) => {
  res.render("oauth.ejs", {});
});

app.post("/oauth", async (req, res) => {
  const accessToken = req.body.access_token;
  const user = await Twitch.getUserInfo(accessToken);
  console.log(user);
  const isSubscribed = await Twitch.isUserIsSubscribedToChannel(
    accessToken,
    user.id,
    "123"
  );
  console.log(isSubscribed);
});

app.listen(3000, () => {});
