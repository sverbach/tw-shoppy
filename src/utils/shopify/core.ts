import { config } from '../config';

// Make a request to Shopify's GraphQL API  and return the data object from the response body as JSON data.
export const makeShopifyRequest = async (
  query: string,
  variables: Record<string, unknown> = {},
  buyerIP: string = ''
) => {
  const isSSR = import.meta.env.SSR;
  const apiUrl = `https://${config.shopifyShop}/api/${config.apiVersion}/graphql.json`;

  function getOptions() {
    // If the request is made from the server, we need to pass the private access token and the buyer IP
    isSSR &&
      !buyerIP &&
      console.error(
        `🔴 No buyer IP provided => make sure to pass the buyer IP when making a server side Shopify request.`
      );

    const { privateShopifyAccessToken, publicShopifyAccessToken } = config;
    const options = {
      method: 'POST',
      headers: {},
      body: JSON.stringify({ query, variables }),
    };
    // Check if the Shopify request is made from the server or the client
    if (isSSR) {
      options.headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': publicShopifyAccessToken,
        'Shopify-Storefront-Buyer-IP': buyerIP,
      };
      return options;
    }
    options.headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': publicShopifyAccessToken,
    };

    return options;
  }

  const response = await fetch(apiUrl, getOptions());

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${body}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join('\n'));
  }

  return json.data;
};
