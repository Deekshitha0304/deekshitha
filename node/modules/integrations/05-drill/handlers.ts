import { http, HttpResponse } from "msw";

// mock api handlers
export const handlers = [

  // happy path
  http.get("https://api.test.com/data", () => {
    return HttpResponse.json({ message: "success" });
  }),

  // unauthorized
  http.get("https://api.test.com/unauthorized", () => {
    return new HttpResponse(null, { status: 401 });
  }),

  // server error
  http.get("https://api.test.com/error", () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // delayed response
  http.get("https://api.test.com/slow", async () => {

    // simulate slow api
    await new Promise(r => setTimeout(r, 6000));

    return HttpResponse.json({ message: "slow response" });
  })

];