class answer{
    constructor(public num : number){}


    get isEven():boolean{
        return this.num % 2 === 0;                  // Build a logic to use later 
    }


    set value(num:number){
        if(num<0) throw new Error("Invalid");
        this.num = num;
    }
}

const numb = new answer(79);
console.log(numb.isEven);                    // Its not a method => Its a property with logic behind it       




// GETTER => GETS SOMETHING
// SETTER => MODIFIES SOMETHING
numb.value=(63);
console.log(numb.isEven);


numb.value=(-3);
console.log(numb.isEven);