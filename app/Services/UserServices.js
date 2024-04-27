import { HTTPError } from "../Exceptions/HTTPError.js";
import { WA } from "../lib/WA.js";
import { Twitch } from "../lib/twitch.js";

/**
 * UserServices class
 */
export class UserServices {
  /**
   * Check if a user is subscribed to a channel
   * @param {String} accessToken user access token
   * @param {String} userId user id
   * @param {String} broadcasterId broadcaster id
   * @returns {Object} réponse de l'api twitch
   */
  static async isSubscribedToChannel(accessToken, userId, broadcasterId) {
    const { data } = await Twitch.isUserIsSubscribedToChannel(
      accessToken,
      userId,
      broadcasterId
    );

    if (!data || data.length === 0) return null;
    const isSubscribed = data[0];
    return isSubscribed;
  }
  /**
   * Ajoute un tag au membre workadventu
   * @param {WA} WA instance de WA pour communiquer avec l'api workadventu.re
   * @param {String} memberID id du membre
   * @param {String} tiers tier de l'abonnement, qui sera le suffixe du tag
   * @returns {Object} le membre mis à jour
   * @throws {HTTPError} si le membre n'est pas trouvé
   */
  static async addRoleToMember(WA, memberID, tiers) {
    try {
      const { data: member } = await WA.getMember(memberID);
      member.tags.push("subscribed_" + tiers);
    } catch (error) {
      throw new HTTPError(404, "Member not found");
    }

    try {
      await WA.patchMember(memberID, {
        tags: member.tags.join(","),
        name: member.name,
      });
      return member;
    } catch (error) {
      console.error(error);
    }
  }
}
