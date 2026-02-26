const Add = (num1:number,num2:number):number => {
    return num1+num2;
};

console.log(Add(2,4));


//map

const numbers = [1,2,4,6,3,5,8];
const doubled = numbers.map(n=>n*2 );
console.log(doubled)

//filter 

const filtered = numbers.filter(n => n % 3 === 0 );
console.log(filtered);

//reduce 

const reduced = numbers.reduce((total,current)=>total+current,0);
console.log(reduced);
