import dotenv from "dotenv";
dotenv.config(); 

console.log("process: ",process.env.API_KEY)
console.log(process.env);

const port = process.env.PORT || 4000;              // if port exists then console or else take 4000

console.log("PORT:", port);




function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}


const PORT_NO = requireEnv("PORT");
console.log("Loaded PORT NO:", PORT_NO);                // checking var is there ..else error