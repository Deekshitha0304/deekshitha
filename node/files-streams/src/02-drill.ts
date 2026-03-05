import fs from "fs/promises";

const file = "02-drill.json";

async function main() {

  const user = {
    name: "Deekshi",
    score: 100
  };

  const jsonString = JSON.stringify(user, null, 2); 
  await fs.writeFile(file, jsonString);
  console.log("JSON written.");


  const data = await fs.readFile(file, "utf-8");

  try {
    const parsed = JSON.parse(data);                        // str -> obj so we can user.name
    console.log("Parsed object:", parsed);
  } catch (error) {
    console.log("Invalid JSON format!");
  }

}

main();