import { Command } from "commander";

const program = new Command();

program
  .command("greet")
  .argument("<name>")
  .option("--uppercase")
  .option("--times <number>")
  .option("--excited")
  .action((name, options) => {
    let message = "Hello, " + name;

    if (options.uppercase) {
      message = message.toUpperCase();
    }

    if (options.excited) {
      message = message + "!!!";
    }

    let times = 1;

    if (options.times) {
      times = Number(options.times);
    }

    if (isNaN(times) || times <= 0) {
      console.log("Times must be a positive number");
      process.exit(1);
    }

    for (let i = 0; i < times; i++) {
      console.log(message);
    }
  });

program.parse();