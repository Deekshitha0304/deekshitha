import dotenv from "dotenv";

dotenv.config();


console.log("Process ID:", process.pid);
console.log("Node Version:", process.version);
console.log("Working Directory:", process.cwd());



const appName: string = process.env.APP_NAME || "MyApp";
const mode: string = process.env.MODE || "development";


console.log("App Name:", appName);
console.log("Mode:", mode);


const args: string[] = process.argv.slice(2);


if (args.length > 0) {
  console.log("Arguments:", args.join(" "));
}


process.on("SIGINT", () => {
  console.log("Shutting down gracefully.");
  process.exit(0);
});

//n