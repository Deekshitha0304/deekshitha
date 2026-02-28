import dotenv from "dotenv";
import { z } from "zod";

// Load .env file
dotenv.config();

// Define schema
const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

// Validate
const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.log("Environment variables are invalid");
  console.log(result.error.issues);
  process.exit(1);
}

// Convert PORT to number manually
export const config = {
  PORT: Number(result.data.PORT),
  NODE_ENV: result.data.NODE_ENV,
};

export type Config = typeof config;