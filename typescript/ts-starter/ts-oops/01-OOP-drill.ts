class Counter{
    constructor(private Result:number){}

    inc(){
        this.Result++;
        return this;                // Will update the Private value , Chaining works 
    }

    dec(){
        this.Result--;
        return this;
    }

    value(){
        return this.Result;
    }

}

const number = new Counter(10);
console.log(number.inc().inc().value());
// console.log(number.inc());
// console.log(number.dec());
// console.log(number.value());