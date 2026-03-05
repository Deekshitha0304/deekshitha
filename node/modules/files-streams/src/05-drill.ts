import fs from "fs";

const writeStream = fs.createWriteStream("log.txt");

for (let i = 1; i <= 50; i++) {
  const canContinue = writeStream.write(`Log line ${i}\n`);                 // not directly but using buffer ..if full stop till mry cleans -> no mry overload

  if (!canContinue) {
    writeStream.once("drain", () => {});
  }
}

const bufferData = Buffer.from("Binary Hello\n", "utf8");
writeStream.write(bufferData);

writeStream.end();

writeStream.on("finish", () => {
  console.log("All data written. Stream closed.");
});

writeStream.on("error", (err) => {
  console.error("Stream error:", err.message);
});