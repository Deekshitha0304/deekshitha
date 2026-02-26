function first<T>(args:T[]):T | undefined{
    return args[0];
}

const test=first([1,2,3,11,3,8]);
console.log(test);

const strTest = first(["a","b","c"]);
console.log(strTest)

const mixedTest = first([1,"2","c"]);
console.log(mixedTest);