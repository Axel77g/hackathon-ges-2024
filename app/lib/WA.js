import axios from "axios";

/**
 * Classe permettant de communiquer avec l'api de workadventu.re
 */
export class WA {
  constructor(worldslug) {
    this.worldslug = worldslug;
  }
  /**
   * Headers pour les requetes vers l'api de workadventu.re
   */
  static get headers() {
    return {
      Authorization: `${process.env.WA_API_TOKEN}`,
    };
  }
  /**
   *  Met à jour les données d'un membre, utiliser pour ajouter un tag à un membre
   * @param {String} memberId le uuid du membre
   * @param {*} payload les données à mettre à jour
   * @returns
   */
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

  /**
   * Récupère les données d'un membre
   * @param {String} memberId le uuid du membre
   * @returns
   */
  async getMember(memberId) {
    const response = await axios.get(
      `${process.env.WA_API_ENDPOINT}/${this.worldslug}/members/${memberId}`,
      { headers: WA.headers }
    );
    return response;
  }
}
