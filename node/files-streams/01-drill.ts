import fs from "fs/promises";

const file = "demo.txt";


//bg working
async function test() {
  await fs.writeFile(file, "Hello, Deekshi\n");                     // await ensures 2nd line appends after 1st finishes
  await fs.appendFile(file, "Appending a new line.\n");

  const content = await fs.readFile(file, "utf-8");                 // converts data to readable string
  console.log(content);

  await fs.unlink(file);                                            // rm demo.txt
}

test();

//n