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






function john1(name1: string | number, rollno: number): string | number {
    if (typeof name1 === "string") {
        return `Hi ${name1}, and ${rollno}`;
    } else {
        return name1 + rollno; // number + number
    }
}

