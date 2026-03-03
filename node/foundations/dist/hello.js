"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hi"); //Path aliasses : Whenever we import something we give full path but instead we can use @util/* which we defined in ts.config
// Path aliasses only work if baseurl is given
const greet_1 = require("@utils/greet"); //npx tsx hello.ts
console.log((0, greet_1.greet)("Deekshi"));
// Errors normally show JS line numbers.
// Source maps allow Node to show:
// Original TypeScript line numbers
// ts.config -> sourcemap:true
// const x: number = 5;
// throw new Error("Test error");
//# sourceMappingURL=hello.js.map