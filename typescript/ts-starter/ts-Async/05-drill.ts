export {};

// Sleep function (wait for given milliseconds)
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
// sleep(ms) → pauses execution for the given milliseconds using setTimeout.



// Retry function with backoff
async function retry<T>(
  op: () => Promise<T>,
  attempts = 2,
  backoffMs = 250
): Promise<T> {

  for (let i = 0; i <= attempts; i++) {
    try {
      return await op(); // Try the operation
    } catch (err: any) {

      const isLastAttempt = i === attempts;
      const shouldRetry = err?.retryable === true;

      if (isLastAttempt || !shouldRetry) {
        throw err; // Stop retrying
      }

      console.log(`Retrying in ${backoffMs * (i + 1)} ms...`);

      await sleep(backoffMs * (i + 1)); // Backoff delay
    }
  }

  throw new Error("Unexpected error");
}
// retry(op, attempts, backoffMs) -> tries an async operation again if it fails with a retryable error, waiting between attempts.


// Example unstable operation
let count = 0;

async function unstableOperation(): Promise<string> {
  count++;

  console.log("Attempt:", count);

  if (count < 3) {
    const error: any = new Error("Temporary failure");
    error.retryable = true; // Mark as retryable
    throw error;
  }

  return "Success after retry!";
}



// Test the retry logic
retry(unstableOperation, 3, 500)
  .then((result) => {
    console.log("Final Result:", result);
  })
  .catch((err) => {
    console.log("Final Error:", err.message);
  });

// unstableOperation() -> simulates a temporary failure that succeeds after a few retries.