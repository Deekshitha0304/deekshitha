let greet: unknown = "Hello";
let num:unknown = 4576565675656465;

console.log((greet as string ).length);



let Value = greet as number;            // treats string as number
console.log(Value+10);



// USING typeof

function Student(name:unknown){
    if(typeof name === "string"){
        console.log(name.length);
    }
    else{
        console.log("Not a string");
    }
}

Student("deekshi");
Student(645);