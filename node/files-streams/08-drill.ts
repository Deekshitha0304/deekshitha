import fs from "fs";

const file = "watch.txt";

const watcher = fs.watch(file, (eventType) => {
  if (eventType === "change") {
    console.log("File modified.");
  }

  if (eventType === "rename") {
    console.log("File renamed or deleted.");
  }
});

setTimeout(() => {
  watcher.close();
  console.log("Stopped watching after 30 seconds.");
}, 30000);