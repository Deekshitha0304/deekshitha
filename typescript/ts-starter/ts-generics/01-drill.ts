//They:
//Preserve exact type
//Prevent unsafe operations
//Enable reusable type-safe functions

function school<T>(args:T):T{
    return args;
};

const student1 = school("Deekshi");
console.log(student1);

console.log(school(4));

const student2 = school({name:"Deekshi"});
console.log(student2);



const stu1 = school<string>("Deekshitha");
console.log(stu1);
