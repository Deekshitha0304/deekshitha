class Aadhar {
    AadharNo : number;
    City : string;

    constructor(Number : number , Village : string){
        this.AadharNo = Number;
        this.City = Village;
    }
    Issued(){                                             // Can create methods 
        console.log("Aadhar issued for "+ this.AadharNo);
    }
}

const person1 = new Aadhar(6712825,"Hyd");
person1.Issued()                                           // Method belongs to Object 



// SHORTCUT FOR CONSTRUCTOR

class Licence{
    constructor(public name:string,public age:number){}  

    drive(){
        console.log("Licence issued for "+ this.name);
    }
}
const user = new Licence("Deekshi",22);
user.drive();



// PRIVATE

class ATM {
    constructor(public Name:string,private PinNo:number){}

    getPinNo(){
        return this.PinNo;
    }
}
const human = new ATM("Deekshi",82624);
console.log(human.Name);
// console.log(human.PinNo);                        // will show error -> so we have to use get method
console.log(human.getPinNo());




// Protected acts like same as Private 
// But the main thing is => We can access Protected members from extended classes


//  PROTECTED

class ATM1 {
    constructor(public name: string, protected pinNo: number) {}
}

class SBIATM extends ATM1 {
    showPinFromChild() {
        return this.pinNo;  
    }
}

const user1 = new SBIATM("Deekshi", 8224);
console.log(user1.showPinFromChild());   