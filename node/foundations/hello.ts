console.log("Hi");                  //Path aliasses : Whenever we import something we give full path but instead we can use @util/* which we defined in ts.config

// Path aliasses only work if baseurl is given



import { greet } from "@utils/greet";               //npx tsx hello.ts
console.log(greet("Deekshi"))



// Errors normally show JS line numbers.

// Source maps allow Node to show:

// Original TypeScript line numbers

// ts.config -> sourcemap:true


// const x: number = 5;

// throw new Error("Test error");

