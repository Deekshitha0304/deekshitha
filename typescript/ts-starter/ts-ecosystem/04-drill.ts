import fs from "fs-extra";
import YAML from "yaml";

// Make sure .data folder exists
fs.ensureDirSync(".data");

//  Create sample YAML content
const yamlContent = `
name: Deekshi
course: TypeScript Ecosystem
active: true
age: 22
`;

// Write YAML file
fs.writeFileSync(".data/sample.yaml", yamlContent);

console.log("YAML file created");

// Read YAML and convert to JS object
const fileText = fs.readFileSync(".data/sample.yaml", "utf-8");
const parsedData = YAML.parse(fileText);

console.log("Parsed YAML:");
console.log(parsedData);

//Write JSON version
fs.writeJSONSync(".data/sample.json", parsedData, { spaces: 2 });

console.log("Converted to JSON");

// Convert JSON back to YAML
const jsonData = fs.readJSONSync(".data/sample.json");
const backToYaml = YAML.stringify(jsonData);

//  Write new YAML file
fs.writeFileSync(".data/roundtrip.yaml", backToYaml);

console.log("Converted back to YAML");