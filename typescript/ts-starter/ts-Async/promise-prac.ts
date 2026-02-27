export{};

const p = new Promise<number>((resolve, reject) => {
  const success = true;

  if (success) {
    resolve(100);
  } else {
    reject("Something failed");
  }
});

async function run() {
  try {
    const result = await p;
    console.log("Success:", result);
  } catch (error) {
    console.log("Error:", error);
  }
}

run();

// Created a Promise that resolves with 100 if success is true, otherwise rejects with an error.

// Used async/await inside try/catch to handle both resolved and rejected states.

// If resolved → logs "Success: 100"; if rejected → logs the error message.