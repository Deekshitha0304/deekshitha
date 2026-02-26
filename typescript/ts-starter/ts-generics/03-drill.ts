function lengthOf<T extends{length:number}>(x: T):number{
    return x.length;
}

console.log(lengthOf([3,4,6,2,4,2]));
console.log(lengthOf(["q","2","o"]));
// console.log(lengthOf(100));
console.log(lengthOf({length:22}));



interface hasId{
    id:number;
}

interface hasName{
    name:string;
}

function students<T extends hasId & hasName > (y:T):string{
    return y.name;
}

console.log(students({name:"Deekshi",id:33}));