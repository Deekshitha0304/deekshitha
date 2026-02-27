// FIRE AND FORGOT 
// Start an async task, but don’t wait (await) for it.
// It runs in background

// ALWAYS ATTACH .CATCH() to catch error

async function backgroundTask(): Promise<void> {
  console.log("Background task started");                           // 1st

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Background task finished");                          // runs in bg 3rd
}

// Fire-and-forget (not awaited)
backgroundTask();

console.log("Main function continues...");                            // 2nd
