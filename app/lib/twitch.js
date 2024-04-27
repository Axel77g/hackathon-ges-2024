import axios from "axios";
import { HTTPError } from "../Exceptions/HTTPError.js";

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const OAUTH_REDIRECT_URL = process.env.TWITCH_REDIRECT_URL;

export class Twitch {
  static query = {
    client_id: CLIENT_ID,
    redirect_uri: OAUTH_REDIRECT_URL,
    response_type: process.env.TWITCH_RESPONSE_TYPE,
    scope: process.env.TWITCH_SCOPE,
  };

  /**
   * recupere l'url de connexion twitch
   */
  static get oauthURL() {
    const queryString = Object.keys(this.query)
      .map((key) => `${key}=${this.query[key]}`)
      .join("&");
    return `https://id.twitch.tv/oauth2/authorize?${queryString}`;
  }

  /**
   *  Verifie si un utilisateur est abonné à une chaine
   * @param {String} accessToken token d'acces de l'utilisateur
   * @param {String} userId id de l'utilisateur
   * @param {String} broadcasterId id de la chaine
   * @returns
   */
  static async isUserIsSubscribedToChannel(accessToken, userId, broadcasterId) {
    const request = new TwitchRequest(
      axios.get(
        `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${broadcasterId}&user_id=${userId}`,
        {
          headers: this.getHeaders(accessToken),
        }
      )
    );
    try {
      const data = await request.call();
      return data;
    } catch (error) {
      if (error.status === 404) return false;
      else throw error;
    }
  }
  /**
   *  Recupere les informations de l'utilisateur
   * @param {String} accessToken
   * @returns {Object}
   * @throws {HTTPError}
   */
  static async getUserInfo(accessToken) {
    const request = new TwitchRequest(
      axios.get("https://api.twitch.tv/helix/users", {
        headers: this.getHeaders(accessToken),
      })
    );
    const { data } = await request.call();
    if (data.length === 0) {
      throw new HTTPError(401, "Unauthorized");
    } else return data[0];
  }
  /**
   * Récupere les headers utiles pour les requetes twitch
   * @param {String} accessToken
   * @returns
   */
  static getHeaders(accessToken) {
    return {
      Authorization: "Bearer " + accessToken,
      "Client-Id": CLIENT_ID,
    };
  }
  /**
   * Genere un access token avec le code oauth génére par twitch
   * @param {String} code
   * @returns
   */
  static async getAccessToken(code) {
    const urlEncodedBody = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: OAUTH_REDIRECT_URL,
    });
    const request = new TwitchRequest(
      axios.post(
        "https://id.twitch.tv/oauth2/token",
        urlEncodedBody.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
    );
    const data = await request.call();
    return data;
  }
}

/**
 * Classe Helper permettant de gerer les requetes vers l'api twitch
 */
class TwitchRequest {
  constructor(axiosRequestPromise) {
    this.promise = axiosRequestPromise;
  }

  call() {
    return new Promise((resolve, reject) => {
      this.promise
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject(
              new HTTPError(error.response.status, error.response.data.message)
            );
          } else {
            reject(new HTTPError(500, "Internal Server Error"));
          }
        });
    });
  }
}
