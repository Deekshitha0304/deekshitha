type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

// Result<T> represents either success or failure in structured form.



async function safeDivide(a: number, b: number): Promise<Result<number>> {
  try {
    if (b === 0) {                                          // error handling inside function only ..instead of code crash
      throw new Error("Cannot divide by zero");
    }

    const result = a / b;

    return { ok: true, value: result };

  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

// try/catch converts thrown errors into typed results.




async function run() {
  const result = await safeDivide(10, 0);

  if (result.ok) {
    console.log("Success:", result.value);
  } else {
    console.log("Error:", result.error);
  }
}

run();



// Always await or handle promises to prevent unhandled rejections.