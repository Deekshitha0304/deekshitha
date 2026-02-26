// Interface is like a contract.It does not give code, It just tells you what must exist.

// Abstract = Contract + Shared code
           // => Forces methods
           // => Provides ready-made logic



abstract class Animal {
    abstract makesound():void;

    getSound(){
        console.log("Meow"); 
    }
}
class dog extends Animal{
    makesound(){
        console.log("Woof! ")
    }
}


const cat = new dog();
cat.getSound()