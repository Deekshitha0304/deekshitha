import { http, HttpResponse } from "msw";

export const handlers = [

  http.get("https://api.github.com/users/test/repos", () => {

    return HttpResponse.json([
      { id: 1, name: "demo", full_name: "test/demo" }
    ]);

  }),

  http.get("https://api.github.com/users/error/repos", () => {

    return new HttpResponse(null, { status: 500 });

  }),

  http.get("https://api.github.com/users/auth/repos", () => {

    return new HttpResponse(null, { status: 401 });

  })

];