// function isEven(n: number): boolean {
//     return n % 2 === 0;
// }
// console.log(isEven(20));



// // In if statement

// const num = 17;

// if (isEven(num)) {
//     console.log(`${num} is even`);
// } else {
//     console.log(`${num} is odd`);
// }


// console.log(isEven(57));
// console.log(isEven(52));



// let counter : number = 5;
// while(counter>0){
//     console.log(counter);
//     counter--;
// }
// console.log("Done!");





type Action="start"|"stop";             //add pause case

function handleAction(action:Action){
    switch(action){
        case "start":
            return "Action started";
        case "stop":
            return "Action stopped";

        default :
            const AllCases : never=action;
            return AllCases;
    }
}
console.log("start");
console.log("stop");

// console.log(handleAction("pause"));

