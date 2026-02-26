export{};
const value: Promise<number> = new Promise((resolve, reject) => {
  resolve(42);
});

value.then((result) => {
  console.log("Resolved number:", result);
});



//Async Function Returning Promise<number>


async function add(a: number, b: number): Promise<number> {
  return a + b;
}
Promise<number>
add(5, 3).then((result) => {
  console.log("Sum:", result);
});


//Convert Callback Style → Promise

function multiplyPromise(a: number, b: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const result = a * b;
    resolve(result);
  });
}
multiplyPromise(4, 5).then((result) => {
  console.log("Promise result:", result);
});



//Creating a Promise vs Awaiting One

//Creating a Promise                                    //I am defining how async work happens.
const p = new Promise<number>((resolve) => {
  resolve(100);
});


//Awaiting a Promise

const result = await p;