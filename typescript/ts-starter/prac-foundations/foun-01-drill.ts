let username: string = "Deekshi";
let age: number = 22;
let isActive: boolean = true;

console.log(username, age, isActive);

//using any 

let value: any = "Hello";

value = 42;
value = true;
value = { name: "Swati" };       //prints last value

console.log(value);


let data: unknown = "Hello";
data = 22;
// console.log(data.toUpperCase());                 // It checks type and gives error




// let message: string = "Hi";

// message = null;      
// message = undefined;                        //with strict mode: ON error comes



