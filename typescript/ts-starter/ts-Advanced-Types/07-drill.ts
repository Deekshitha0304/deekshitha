type Events = "click" | "hover" | "focus";

type EventHandlerNames = `on${Capitalize<Events>}`;

// Valid assignments
let handler1: EventHandlerNames = "onClick";
let handler2: EventHandlerNames = "onHover";
let handler3: EventHandlerNames = "onFocus";

// Invalid assignment (uncomment to test)
// let handler4: EventHandlerNames = "onclick"; 
// let handler5: EventHandlerNames = "onBlur";  

console.log("Handler 1:", handler1);
console.log("Handler 2:", handler2);
console.log("Handler 3:", handler3);

