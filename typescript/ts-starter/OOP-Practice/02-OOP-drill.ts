class Demo{
    constructor(public name:string, private phone:number, protected Id : number){}

    getValue(){
        return this.phone;
    }
}
class SubDemo extends Demo{
    getStudentID(){
        return this.Id;
    }
}


const Student = new Demo("Deekshi",638768329,568);
console.log(Student.getValue());

const Student1=new SubDemo("Swati",736788732,927);              // Protected is accessed from extended class
console.log(Student1.getStudentID());




// ECMAscript VS PRIVATE => truly hidden 
    // 1. Not at RunTime                1. Accessable at RunTime
    // 2. Not at Compile Time also      2. Not at Compile Time


class test {
    #password = number;
}
const credentials = new test();
// console.log(credentials.#password);
 