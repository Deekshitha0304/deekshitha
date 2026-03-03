import { EventEmitter } from "events";

const emitter = new EventEmitter();

function listenerOne(data: string) {
  console.log("Listener One:", data);
}

function listenerTwo(data: string) {
  console.log("Listener Two:", data);
}

emitter.on("greet", listenerOne);
emitter.on("greet", listenerTwo);

emitter.emit("greet", "Hello Deekshi");                 // event triggers

emitter.off("greet", listenerOne); 

console.log("After removing Listener One");

emitter.emit("greet", "Hello Again");