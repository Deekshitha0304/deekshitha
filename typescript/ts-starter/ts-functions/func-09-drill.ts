type Calculator = (a: number, b: number) => number;
type Validator = (input: string) => boolean;

const add: Calculator = (a, b) => {
  return a + b;
};

const multiply: Calculator = (a, b) => {
  return a * b;
};

const isNotEmpty: Validator = (input) => {
  return input.length > 0;
};

function executeCalculation(
  a: number,
  b: number,
  operation: Calculator
): number {
  return operation(a, b);
}
console.log(executeCalculation(5, 3, add));       


function checkInput(
  value: string,
  validator: Validator
): boolean {
  return validator(value);
}

console.log(checkInput("hello", isNotEmpty)); 
