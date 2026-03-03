// build a small HTTP server and handle shutdown properly.


import http from "http";

const server = http.createServer((req,res)=>{
    res.end("Server running! ")
});


server.listen(2728,() =>{
    console.log("Server started on https://localhost:2728");
});



// process.on("SIGINT", () => {
//   console.log("Received SIGINT ");
//   process.exit(0);
// });


function done(signal: string) {
  console.log(`Received ${signal}. Closing server...`);

  server.close(() => {
    console.log("Server closed. Goodbye ");
    process.exit(0);
  });
}
process.on("SIGINT", () => done("SIGINT"));


// t 