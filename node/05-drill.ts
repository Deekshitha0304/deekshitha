// With debugger:

// You freeze the program at a specific line
// You inspect everything
// You move step-by-step

function add(num1:number,num2:number){
    
    debugger;
    return num1+num2
}
console.log(add(4,5))


const students = [
  { id: 1, name: "Deekshi" },
  { id: 2, name: "Alex" }
];

console.log(students);




//If you DO NOT handle the error using try/catch, it becomes -> Uncaught exception


function crash() {
  throw new Error("Boom!");                             //at crash : where error happened
}

// crash();                                               // at object : which function called it




function level1() {
  level2();
}

function level2() {
  level3();
}

function level3() {
  throw new Error("Explosion");
}

level1();                               // l1 called l2 -> l2 called l3 -> l3 crashed   ===> Stack Trace
