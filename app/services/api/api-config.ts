// Use this import if you want to use "env.js" file
const { API_URL, ACCESS_TOKEN } = require("../../config/env")
// Or just specify it directly like this:
/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string
  accessToken: string
  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || "https://jsonplaceholder.typicode.com",
  accessToken: ACCESS_TOKEN,
  timeout: 10000,
}
