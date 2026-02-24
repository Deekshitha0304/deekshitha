function isEven(n) {
    return n % 2 === 0;
}
console.log(isEven(20));
// In if statement
var num = 17;
if (isEven(num)) {
    console.log("".concat(num, " is even"));
}
else {
    console.log("".concat(num, " is odd"));
}
console.log(isEven(57));
console.log(isEven(52));
var counter = 5;
while (counter > 0) {
    console.log(counter);
    counter--;
}
console.log("Done!");
function handleAction(action) {
    switch (action) {
        case "start":
            return "Action started";
        case "stop":
            return "Action stopped";
        default:
            var AllCases = action;
            return AllCases;
    }
}
console.log(handleAction("pause"));
