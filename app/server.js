import "dotenv/config";
import https from "https";
import fs from "fs";
import cors from "cors";
import express from "express";
import session from "express-session";
import { HTTPError } from "./Exceptions/HTTPError.js";
import { Twitch } from "./lib/twitch.js";
import { WA } from "./lib/WA.js";
import { LoginQueue } from "./lib/LoginQueue.js";
import cookieParser from "cookie-parser";
import { UserServices } from "./Services/UserServices.js";

const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
};

const app = express();
https.createServer(options, app).listen(3000);

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(
    session({
      secret: "toepoekk",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 1000,
      },
    })
);

app.WA = new WA(process.env.WA_WORLD_SLUG);
app.LoginQueue = new LoginQueue();

app.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    const errorResponse = {
      status: err.status,
      message: err.message,
    };
    res.status(err.status).json(errorResponse);
  } else {
    next(err);
  }
});

app.get("/login", (req, res) => {
  console.log(req.session, req.cookies);
  res.render("login.ejs", { url: Twitch.oauthURL });
});

app.get("/test", (req, res) => {
  console.log(req.session);
  return res.render("test.ejs");
});

app.post("/is-connected", async (req, res) => {
  res.send({
    connected: Boolean(req?.session?.user?.isSubscribed),
  });
});

app.get("/success", (req, res) => {
  res.render("success.ejs", {});
});

app.get("/oauth", async (req, res) => {
  const { code, state } = req.query;
  if (!code && !state) throw new HTTPError(400, "Bad Request");

  const response = await Twitch.getAccessToken(code);
  if (!response) throw new HTTPError(500, "Internal Server Error");
  const accessToken = response.access_token;

  const memberID = Buffer.from(state, "base64").toString("utf8");
  const user = await Twitch.getUserInfo(accessToken);

  const isSubscribed = await UserServices.isSubscribedToChannel(
      accessToken,
      user.id,
      "28575692"
  );

  if (isSubscribed || true) {
    const member = await UserServices.addRoleToMember(
        app.WA,
        memberID,
        "isSubscribed.tier"
    );
    req.session.user = {
      twitch: user,
      accessToken,
      member,
      isSubscribed: true,
    };
    req.session.save();
    res.render("success.ejs", {});
  } else {
    req.session.user = {
      twitch: user,
      accessToken,
      member: null,
      isSubscribed: false,
    };
    req.session.save();
    res.render("failure.ejs", {});
  }
});