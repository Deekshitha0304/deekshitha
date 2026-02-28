type Config = {
  port: number;
  env: "dev" | "prod";
};

type AppError = {
  message: string;
  code: string;
};

type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: AppError };


  function parseConfig(input: any): Result<Config> {
  if (typeof input.port !== "number") {
    return {
      ok: false,
      error: { message: "Invalid port", code: "INVALID_PORT" }
    };
  }

  if (input.env !== "dev" && input.env !== "prod") {
    return {
      ok: false,
      error: { message: "Invalid env", code: "INVALID_ENV" }
    };
  }

  return {
    ok: true,
    value: {
      port: input.port,
      env: input.env
    }
  };
}


const result = parseConfig({ port: 3000, env: "dev" });

if (result.ok) {
  console.log("Config loaded:", result.value);
} else {
  console.error("Error:", result.error.code);
}





//Throwing Errors

class AppError1 extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}

function parseConfig1(input: any): Config {
  if (typeof input.port !== "number") {
    throw new AppError1("INVALID_PORT", "Invalid port");
  }

  if (input.env !== "dev" && input.env !== "prod") {
    throw new AppError1("INVALID_ENV", "Invalid env");
  }

  return {
    port: input.port,
    env: input.env
  };
}

try {
  const config = parseConfig({ port: 3000, env: "dev" });
  console.log("Config loaded:", config);
} catch (err) {
  if (err instanceof AppError1) {
    console.error("Error:", err.code);
  }
}