import fs from "fs";
import { Transform } from "stream";

const start = Date.now();                       // To measure how long copying takes

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {                    // default chunk is buffer -> string
    const upper = chunk.toString().toUpperCase();         
    callback(null, upper);
  }
});

readStream
  .pipe(upperCaseTransform)
  .pipe(writeStream);

writeStream.on("finish", () => {
  const end = Date.now();
  console.log("done.");
  console.log("Time taken:", end - start, "ms");
});

readStream.on("error", console.error);
writeStream.on("error", console.error);