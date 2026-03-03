function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  const result = divide(5, 0);
  console.log(result);
} catch (error) {
  console.error("Caught error:", error);
}




// Handle a rejected promise with .catch()

async function run() {
  try {
    await Promise.reject("Something failed");
  } catch (err) {
    console.log("Caught error:", err);
  }
}

run();



// Not for handling errors -> to log crashes

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

throw new Error("Unexpected crash");                    // Handles errors





// Same but for promises

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

Promise.reject("Database failed");                      // Handles Rejected promises

//If any promise gets rejected and nobody catches it, call this function.