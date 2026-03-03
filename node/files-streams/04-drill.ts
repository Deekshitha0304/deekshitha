//stream : read files in small chunks -> piece by piece

import fs from "fs";

const file = "big.txt";

const readStream = fs.createReadStream(file);           // gives files in small pieces

let chunkCount = 0;

readStream.on("data", (chunk) => {
  chunkCount++;
  console.log("Chunk received. Size:", chunk.length, "bytes");
});

readStream.on("end", () => {
  console.log("done.");
  console.log("Total chunks:", chunkCount);
});

readStream.on("error", (err) => {
  console.error("Error reading file:", err.message);
});