import { HTTPError } from "../Exceptions/HTTPError.js";
import { Twitch } from "../lib/twitch.js";

export class UserServices {
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
