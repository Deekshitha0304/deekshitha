type Keys<T> = keyof T;

interface user {
  name: string;
  age: number;
  
}

type userKeys = Keys<user>;                     // "name"|"age"

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user2: user = {
  name: "deekshi",
  age: 30,
};

const test1 = getProp(user2, "name");
console.log(test1);


const test2 = getProp(user2, "age");
console.log(test2);



// console.log(getProp(user2,"missing"));       
 //missing is not there in user 