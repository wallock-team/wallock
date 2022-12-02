import { Axios } from 'axios';

export class AuthApi {
  constructor(private readonly _axios: Axios) {}

  /**
   * Get Google's login URL
   *
   * Call this method to get the URL of Google's login page.
   * Note that the method give you the URL, you have to redirect to it yourself, base on the framework in use.
   *
   * @param successUrl URL to redirect to after a successful login.
   *                   Redirect to homepage if not specified.
   *                   Note: only the subpath is needed as the base URL is included automatically.
   *                   Examples: `/me` is valid, while `http://localhost:3001/me` is not.
   * @returns the URL to redirect to
   */
  getGoogleLoginUrl(successUrl: string = '/') {
    // TODO: sanitize the URL for edge cases
    // Examples:
    //  Missing separators: http://localhost:3000me
    //  Double separators: http://localhost:3000//me
    //  Invalid characters: http://localhost:3000&^&%me
    return (
      `${process.env.API_URL}/login-with-google` +
      `?success_url=${process.env.WEB_URL + successUrl}`
    );
  }
}
