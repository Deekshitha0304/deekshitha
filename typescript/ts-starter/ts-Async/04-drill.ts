function timeout<T>(p: Promise<T>, ms: number): Promise<T> {                            
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {                            // slowTask won't return because it delayed by 3sec
      reject("Timeout happened");
    }, ms);

    p.then((value) => {
      clearTimeout(timer);   // stop timer if success
      resolve(value);
    }).catch((err) => {
      clearTimeout(timer);   // stop timer if error
      reject(err);
    });
  });
}

// If promise finishes before ms -> return result.
// If it takes longer -> reject with timeout.
// Cleared timer to avoid unnecessary execution.



// Slow promise to test timeout
function slowTask(): Promise<string> {                      // Returns task in 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task completed");
    }, 3000); 
  });
}


// Testing timeout
timeout(slowTask(), 1000)                                  // Rejects answers if if exceeds 1 sec
  .then((res) => console.log("Success:", res))
  .catch((err) => console.log("Error:", err));