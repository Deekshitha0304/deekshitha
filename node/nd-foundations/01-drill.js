console.log("Process ID: ",process.pid);
console.log("Node Version: ",process.version);



console.log("Veggies: ", process.argv.slice(3));


// To get Current Working Directory 

console.log("Current Working Directory:", process.cwd());

console.log(process.env);



console.log("Hello")                  // Only prints Hello
process.exit(0);                     // after this code won't run anymore

console.log("World")
process.exit(1);

// node 01-drill.js && echo "Success"


