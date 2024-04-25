import "dotenv/config";
import express from "express";
import { HTTPError } from "./Exceptions/HTTPError.js";
import { Twitch } from "./lib/twitch.js";
import { WA } from "./lib/WA.js";
import { LoginQueue } from "./lib/LoginQueue.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.WA = new WA(process.env.WA_WORLD_SLUG);
app.LoginQueue = new LoginQueue();

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
  res.render("login.ejs", { url: Twitch.oauthURL });
});

app.post("/is-connected", async (req, res) => {
  const uuid = req.body.uuid;
  res.json({ connected: app.LoginQueue.has(uuid) });
  app.LoginQueue.delete(uuid);
});

app.get("/player", (req, res) => {
  res.render("player.ejs", { host: process.env.HOST });
});

app.get("/oauth", (req, res) => {
  res.render("oauth.ejs", {});
});

app.post("/oauth", async (req, res) => {
  const accessToken = req.body.access_token;
  const state = req.body.state;
  if (!state && !accessToken) throw new HTTPError(400, "Bad Request");
  const memberID = Buffer.from(state, "base64").toString("utf8");

  const user = await Twitch.getUserInfo(accessToken);

  const { data } = await Twitch.isUserIsSubscribedToChannel(
    accessToken,
    user.id,
    "28575692" // a changer
  );
  if (data.length === 0) throw new HTTPError(401, "Unauthorized");
  const isSubscribed = data[0];
  if (isSubscribed) {
    const { data: member } = await app.WA.getMember(memberID);
    member.tags.push("subscribed_" + isSubscribed.tier);
    try {
      await app.WA.patchMember(memberID, {
        tags: member.tags.join(","),
        name: member.name,
      });
    } catch (error) {
      console.error(error);
    }
    app.LoginQueue.set(memberID, new Date());
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/oauth/success", (req, res) => {
  res.render("success.ejs", {});
});

app.get("/oauth/failure", (req, res) => {
  res.render("failure.ejs", {});
});

app.listen(3000, () => {});
