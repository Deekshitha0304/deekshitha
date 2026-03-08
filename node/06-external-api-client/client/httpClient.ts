export async function httpClient(
  url: string,
  options: any = {},
  retries = 3
) {

  const controller = new AbortController(); // timeout controller

  const timeout = setTimeout(() => {
    controller.abort(); // abort request
  }, 5000);

  const start = Date.now(); // start timer

  try {

    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    const latency = Date.now() - start; // measure latency

    console.log("Request:", url);
    console.log("Latency:", latency, "ms");

    if (!res.ok) {

      if (res.status >= 500 && retries > 0) {

        console.log("Retrying request");

        return httpClient(url, options, retries - 1);
      }

      throw new Error(`HTTP error ${res.status}`);
    }

    try {
      return await res.json(); // parse json
    } catch {
      throw new Error("Invalid JSON response");
    }

  } catch (err) {

    if (retries > 0) {
      return httpClient(url, options, retries - 1);
    }

    throw err;

  } finally {
    clearTimeout(timeout);
  }
}