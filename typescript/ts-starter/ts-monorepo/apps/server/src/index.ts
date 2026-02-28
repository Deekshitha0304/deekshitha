
// import { add } from "@acme/shared";

// const result = add(5, 10);

// console.log("Server result:", result);


import { greet } from "./legacy.js";

console.log(greet("Deekshi"));


import { add, shout } from "@acme/shared";

console.log(add(2, 3));
console.log(shout("drill2"));


import dayjs from "dayjs";

console.log("Current time:", dayjs().format());