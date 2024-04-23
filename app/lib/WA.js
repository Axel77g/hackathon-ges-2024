import axios from "axios";

export class WA {
  constructor(worldslug) {
    this.worldslug = worldslug;
  }

  static get headers() {
    return {
      Authorization: `${process.env.WA_API_TOKEN}`,
    };
  }

  async patchMember(memberId, payload) {
    try {
      const response = await axios.patch(
        `${process.env.WA_API_ENDPOINT}/${this.worldslug}/members/${memberId}`,
        payload,
        { headers: WA.headers }
      );
      return response;
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async getMember(memberId) {
    const response = await axios.get(
      `${process.env.WA_API_ENDPOINT}/${this.worldslug}/members/${memberId}`,
      { headers: WA.headers }
    );
    return response;
  }
}
