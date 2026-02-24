function greet(name:string,age:number=21){
    if(age!== undefined){
        return `Hi ${name}, age is ${age}`;
    }
    return `Hi ${name}`;
}

console.log(greet("Deekshi"));
console.log(greet("Swatii",22));