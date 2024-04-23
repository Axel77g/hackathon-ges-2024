import "dotenv/config";
import express from "express";
import { HTTPError } from "./Exceptions/HTTPError.js";
import { Twitch } from "./lib/twitch.js";
import { WA } from "./lib/WA.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());

app.WA = new WA(process.env.WA_WORLD_SLUG);

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

app.get("/player", (req, res) => {
  res.render("player.ejs", { host: process.env.HOST });
});

app.get("/oauth", (req, res) => {
  res.render("oauth.ejs", {});
});

app.post("/oauth", async (req, res) => {
  const accessToken = req.body.access_token;
  const memberID = req.body.member_id; // trouver un moyen de faire remonter cette info depuis le front
  const user = await Twitch.getUserInfo(accessToken);

  const isSubscribed = await Twitch.isUserIsSubscribedToChannel(
    accessToken,
    user.id,
    "123" // a changer
  );
  if (isSubscribed) {
    const { data: member } = await app.WA.getMember(memberID);
    console.log(member);
    member.tags.push("subscribed");
    await app.WA.patchMember(memberID, {
      tags: member.tags.join(","),
      name: member.name,
    });
    res.render("success.ejs", {});
  } else {
    res.render("failure.ejs", {});
  }
});

app.listen(3000, () => {});
