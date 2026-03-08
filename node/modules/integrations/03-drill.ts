import "dotenv/config"; // load env variables

// helper to add bearer token
export function withAuth(client: any, token: string) {

  return async function (url: string, options: any = {}) {

    // add Authorization header
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`
    };

    // call original client
    return client(url, options);
  };
}

// store cached token
let cachedToken: string | null = null;

// store expiry time
let expiryTime = 0;

// get oauth token
export async function getToken() {

  const now = Date.now(); // current time

  // reuse cached token if still valid
  if (cachedToken && now < expiryTime) {
    return cachedToken;
  }

  // request new token
  const res = await fetch(process.env.TOKEN_URL!, {
    method: "POST"
  });

  const data = await res.json(); // parse token response

  cachedToken = data.access_token; // save token

  // calculate expiry time
  expiryTime = now + (data.expires_in * 1000) - 2000;

  return cachedToken;
}

// call protected api
async function callProtectedAPI() {

  const token = await getToken(); // get oauth token

  // create authenticated client
const authClient = withAuth(fetch, token!); 
  // call protected api
  const res = await authClient("http://localhost:4000/protected");

  const data = await res.json();

  console.log(data); // print result
}

// start test
callProtectedAPI();