// function toArray(name:string):string;
// function toArray(name:string,phone:number):string;

// function toArray(name:string,phone?:number){
//     if(phone!==undefined){
//         return `Hi ${name},Ur phone number is ${phone}`;
//     }
//     return `Hi ${name}`;

// }
// console.log(toArray("Deekshi"));
// console.log(toArray("Swati",66564545645));



// function john(name1:string,rollno:number):string;
// function john(phone:number,age:number):number;

// function john(name1?:string,rollno?:number,phone:number,age:number):string|number{
//     if(name1 !== undefined && rollno !== undefined ){
//         return `Hi ${name1}, and ${rollno}`
//     }
//     return `hi ${phone},${age}`;
// }


// console.log(john("swati",26))





function john1(name1: string | number, rollno: number): string | number {
    if (typeof name1 === "string") {
        return `Hi ${name1}, and ${rollno}`;
    } else {
        return name1 + rollno; // number + number
    }
}