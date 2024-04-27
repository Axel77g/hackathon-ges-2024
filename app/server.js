import "dotenv/config";
import https from "https";
import fs from "fs";
import cors from "cors";
import express from "express";
import session from "express-session";
import { HTTPError } from "./Exceptions/HTTPError.js";
import { Twitch } from "./lib/twitch.js";
import { WA } from "./lib/WA.js";
import cookieParser from "cookie-parser";
import { UserServices } from "./Services/UserServices.js";

/**
 * --- Setup https server ---
 */
const app = express();
if (process.env.HTTPS) {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };
  https.createServer(options, app).listen(process.env.PORT || 3000);
} else {
  app.listen(process.env.PORT || 3000);
}
app.WA = new WA(process.env.WA_WORLD_SLUG);
app.set("view engine", "ejs");
app.set("views", "./views");

/**
 * --- Middlewares ---
 */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
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

/**
 * --- Routes ---
 */
app.get("/login", (req, res) => {
  res.render("login.ejs", { url: Twitch.oauthURL });
});

/**
 * Route pour vérifier si un utilisateur est connecté (appler par la page /login)
 */
app.post("/is-connected", async (req, res) => {
  res.send({
    connected: Boolean(req?.session?.user?.isSubscribed),
  });
});

/**
 * Route de redirection après l'authentification twitch
 */
app.get("/oauth", (req, res) => {
  HTTPError.handle(async () => {
    const { code, state } = req.query;
    if (!code && !state) throw new HTTPError(400, "Bad Request");

    // Récupération de l'access token
    const response = await Twitch.getAccessToken(code);
    if (!response) throw new HTTPError(500, "Internal Server Error");
    const accessToken = response.access_token;

    // Récupération des informations de l'utilisateur twitch et de l'uid du membre WA
    const memberID = Buffer.from(state, "base64").toString("utf8");
    const user = await Twitch.getUserInfo(accessToken);

    // Vérification de l'abonnement à la chaine
    const isSubscribed = await UserServices.isSubscribedToChannel(
      accessToken,
      user.id,
      "28575692"
    );

    // Ajout du tag subscribed_tier au membre WA si l'utilisateur est abonné
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
      res.render("success.ejs", { user: req.session.user, withContinue: true });
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
  }, res);
});

/**
 * Route success
 */
app.get("/success", (req, res) => {
  res.render("success.ejs", { user: req.session.user, withContinue: false });
});
