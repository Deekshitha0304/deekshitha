import fs from "fs-extra";

// Make sure .data folder exists
fs.ensureDirSync(".data");

//  Write JSON file
const data = {
  name: "Deekshi",
  course: "TypeScript Ecosystem",
  active: true,
};

fs.writeJSONSync(".data/state.json", data, { spaces: 2 });

console.log("File written successfully");

//Read JSON file
const readData = fs.readJSONSync(".data/state.json");

console.log("Read from file:");
console.log(readData);