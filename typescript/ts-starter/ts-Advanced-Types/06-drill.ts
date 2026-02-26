// Required<T> removes all ?

// type Required<T> = {
//   [P in keyof T]-?: T[P];
// };


// FORCE ALL FIELDS (REQUIRED<T>)

type fields={
    name : string;
    id ?: number;
}

const userrr:StrictFields={
    name:"dekshi",
    id:33

}
console.log(userrr)



type StrictFields = Required<fields>            // Now when we use this type ..then it makes all mandatory




// FREEZE ALL FIELDS (READONLY<T>)

type FrozeFields = Readonly<fields>

const userr:FrozeFields={name:"Deekshi",id:21};
// userr.id=22      //cannot assign 





//EXTRACT<UNION,SUBSET>

// Extract Example

type Letters = "a" | "b" | "c";

type OnlyAB = Extract<Letters, "a" | "b">;

// Valid assignments
let letter1: OnlyAB = "a";
let letter2: OnlyAB = "b";

// Invalid assignment (uncomment to test error)
// let letter3: OnlyAB = "c"; 

console.log("Extract Result:");
console.log(letter1);
console.log(letter2);          //It filters and keeps matches.


//EXCLUDE<UNION,SUBSET>


// Exclude Example

type Letters2 = "a" | "b" | "c";

type WithoutA = Exclude<Letters2, "a">;

// Valid assignments
let letter4: WithoutA = "b";
let letter5: WithoutA = "c";

// Invalid assignment (uncomment to test error)
// let letter6: WithoutA = "a"; 

console.log("Exclude Result:");
console.log(letter4);
console.log(letter5);