//pnpm add dotenv

import dotenv from "dotenv";

dotenv.config()                 // loads .env to process.env

console.log("Number: ",process.env.API_NUMBER);
console.log("Name: ",process.env.NAME)

console.log("New: ",process.env)

// Override : API_NUMBER=9999 node 02-drill.ts


const NAME = process.env.NAME || "Chrome";                      //fallback default is created 
console.log("Name: ",NAME)




function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable "${name}" is not there.`);
  }

  return value;
}
console.log(requireEnv("PORT"));
