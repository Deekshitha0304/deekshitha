type Student = {
  name: string;
  age: number;
};


const user1 = {
  name: "Deekshi",
  age: 21,
  department: "HR"
};


function greet(person: Student) {
  console.log(`Hello, ${person.name}, age ${person.age}`);
}


greet(user1);