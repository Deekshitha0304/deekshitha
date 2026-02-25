class Example {
    static created = 0;   // belongs to class

    constructor(private result: number) {
        Example.created++;   // increment every time object is created
    }

    inc(): this {
        this.result++;
        return this;
    }

    dec(): this {
        this.result--;
        return this;
    }

    value(): number {
        return this.result;
    }
}

const test1 = new Example(88);
console.log(test1);
const test2 = new Example(77);
console.log(test2);


console.log(Example.created);



//FUNCTION VERSION

function makeCounter(initial = 0) {
  let result = initial;

  return {
    inc() {
      result++;
      return this;
    },
    value() {
      return result;
    }
  };
}

const c = makeCounter(10);
console.log(c.inc().inc().value());    


// CLASS WINS IN MEMORY EFFICIENCY 