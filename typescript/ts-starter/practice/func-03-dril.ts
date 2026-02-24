function allSum(...numbers:number[]):number{
    return numbers.reduce((total,current)=>total+current,0);
}
console.log(allSum(3,2,1,4,5));
console.log(allSum(4,6));



//Handle both string and number

function sumAll(...nums: (string | number)[]): number {
    return nums.reduce<number>((total, current) => {            // we will use <number> ..explicitly telling output is number
        return total + Number(current);
    }, 0);
}

console.log(sumAll(1, 2, "3"));      
console.log(sumAll("10", 20));       
console.log(sumAll("5", "5"));       


function AllAdd(...answers:number[]):number{
    return answers.reduce<number>((total,current)=> total+current,0);
}

console.log(AllAdd(2,3,0,1,4,6,3));
console.log(AllAdd(2,3,3));
console.log(AllAdd(2,3,0,1,4));

