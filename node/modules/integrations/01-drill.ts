// helper function for http requests

export async function fetchJson(url: string) {
  // timeout controller
  const controller = new AbortController();             // cancels fetch req
  const timeout = setTimeout(() => controller.abort(), 5000);     // 5s timeout

  try {
    const res = await fetch(url, {
      signal: controller.signal,
    });

    // log request
    console.log("URL:", url);
    console.log("Status:", res.status);

    // non 200 response
    if (!res.ok) {
      throw {
        error: "Request failed",
        status: res.status,
      };
    }

    // parse json
    let data;
    try {
      data = await res.json();
    } catch {
      throw {
        error: "Invalid JSON response",
      };
    }

    return data;

  } catch (err: any) {
    // timeout error
    if (err.name === "AbortError") {
      throw {
        error: "Request timeout",
      };
    }

    throw err;

  } finally {
    clearTimeout(timeout);
  }
}



// async function test() {
//   try {
//     const data = await fetchJson("http://localhost:4000/posts/1");
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// }

// test();




async function test1() {
  try {
    const data = await fetchJson("https://jsonplaceholder.typicode.com/200?sleep=7000");
    console.log(data);
  } catch (err) {
    console.error("Abort test error:", err);
  }
}

test1();