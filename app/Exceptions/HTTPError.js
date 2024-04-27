/**
 * HTTPError class
 *
 */
export class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
  /**
   * Permet de prendre en charge les erreurs HTTP et afficher une réponse appropriée
   */
  static async handle(callback, res) {
    try {
      await callback();
    } catch (err) {
      if (err instanceof HTTPError) {
        const errorResponse = {
          status: err.status,
          message: err.message,
        };
        res.status(err.status).json(errorResponse);
      } else {
        throw err;
      }
    }
  }
}
