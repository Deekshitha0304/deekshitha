import fs from "fs";
import { Transform } from "stream";

const logFile = "app.log";
const filter = process.argv[2];         // npx tsx logmon.ts ERROR -> process.argv[2] = "ERROR"

let position = 0;

// Transform stream 

const filterStream = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString();

    if (!filter || text.includes(filter)) {
      this.push(text);
    }

    callback();
  }
});

// Function to stream new log lines

function streamNewLogs() {

  const stream = fs.createReadStream(logFile, {                     //only reads new part of file
    encoding: "utf8",
    start: position
  });

  stream.on("data", (chunk) => {
    position += Buffer.byteLength(chunk);
  });

  stream.pipe(filterStream).pipe(process.stdout);

  stream.on("error", (err) => {
    console.error("Stream error:", err.message);
  });
}

// Watch file changes

const watcher = fs.watch(logFile, (eventType) => {

  if (eventType === "change") {
    streamNewLogs();
  }

  if (eventType === "rename") {
    console.log("Log file rotated or renamed");
    position = 0;                                               // position updated to new file
  }
});


process.on("SIGINT", () => {
  console.log("\nStopping log monitor...");
  watcher.close();
  process.exit(0);
});

console.log(`Watching ${logFile}...`);