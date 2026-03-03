console.log("Running...")           // node --watch 

console.time("Loop")                    //n
for (let i=0;i<10;i++){}
console.timeEnd("Loop")



console.log(process.memoryUsage());


console.log("Node version:", process.version);