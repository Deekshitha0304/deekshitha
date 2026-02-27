export {};

// Helper: create AbortController with timeout
function withTimeoutSignal(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, ms);

  return { controller, signal: controller.signal, timer };
}

// withTimeoutSignal(ms) -> creates a controller that automatically cancels the task after given time.



// Mock fetch that supports abort signal
function mockFetch(signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {

    const timer = setTimeout(() => {
      resolve("Fetched successfully");
    }, 3000); // slow 3 sec task

    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Aborted"));
    });
  });
}

// mockFetch(signal) -> simulates a slow request and stops it if the signal says abort.



// Retry function (do not retry if aborted)
async function retry<T>(
  op: () => Promise<T>,
  attempts = 2
): Promise<T> {

  for (let i = 0; i <= attempts; i++) {
    try {
      return await op();
    } catch (err: any) {

      if (err.message === "Aborted") {
        throw err;                  // do NOT retry aborted requests
      }

      if (i === attempts) {
        throw err;
      }

      console.log("Retrying...");
    }
  }

  throw new Error("Unexpected error");
}

// retry() → tries the operation again if it fails, but does NOT retry if it was cancelled.



// Test everything together
async function run() {
  const { signal } = withTimeoutSignal(1000); // 1 sec timeout

  try {
    const result = await retry(
      () => mockFetch(signal),
      2
    );

    console.log("Result:", result);

  } catch (err: any) {
    console.log("Error:", err.message);
  }
}

run();