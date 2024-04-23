import axios from "axios";
import { HTTPError } from "../Exceptions/HTTPError.js";

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const OAUTH_REDIRECT_URL = process.env.TWITCH_REDIRECT_URL;

export class Twitch {
  static query = {
    client_id: CLIENT_ID,
    redirect_uri: OAUTH_REDIRECT_URL,
    response_type: process.env.TWITCH_RESPONSE_TYPE,
    scope: process.env.TWITCH_SCOPE,
  };

  static get oauthURL() {
    const queryString = Object.keys(this.query)
      .map((key) => `${key}=${this.query[key]}`)
      .join("&");
    return `https://id.twitch.tv/oauth2/authorize?${queryString}`;
  }

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

  static getHeaders(accessToken) {
    return {
      Authorization: "Bearer " + accessToken,
      "Client-Id": CLIENT_ID,
    };
  }
}

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
            //console.log(error.response);
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
