export async function fetchWithRetry(url: string, maxRetries = 3) {
  let attempt = 0;

  while (true) {
    try {
      const res = await fetch(url);

      console.log("URL:", url, "Status:", res.status);

      // Do not retry most 4xx errors
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        throw { error: "Client error", status: res.status };
      }

      // Retry on server errors
      if ([502, 503, 504].includes(res.status)) {
        throw { error: "Server error", status: res.status };
      }

      const data = await res.json();
      return data;

    } catch (err: any) {

      if (attempt >= maxRetries) {
        throw { error: "Max retries reached", details: err };
      }

      attempt++;

      // Exponential backoff
      let delay = Math.pow(2, attempt) * 100;               // 200,400,800

       delay += Math.random() * 100;                        // adds rsndom small value

      // Respect Retry-After header if available
      if (err?.headers?.get?.("Retry-After")) {
        delay = parseInt(err.headers.get("Retry-After")) * 1000;
      }

      console.log(`Retry ${attempt} after ${delay.toFixed(0)}ms`);

      await new Promise((r) => setTimeout(r, delay));
    }
  }
}


async function testRetry503() {
  try {
    const data = await fetchWithRetry("https://httpstat.us/503");
    console.log(data);
  } catch (err) {
    console.error("Final Error:", err);
  }
}

testRetry503();