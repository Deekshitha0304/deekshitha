type ReadOnly<T> = { 
    readonly [K in keyof T]: T[K] 
};

// Loop over every key in T
// Keep the same type T[K]
// Add readonly to each property

interface User{
    phone : number;
    aadhar : number;
};

type ReadonlyUser = ReadOnly<User>



const user1: ReadonlyUser = {
  phone: 2343534534,          
  aadhar: 21,
};

// user1.phone = 438623868;  
//  Shows Error like can't assign cause its readonly


type Partiall<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Partiall<User>;

const user22: PartialUser = {
  phone:86752651,
};  //  age not required
console.log(user22)

const user3: PartialUser = {};  //  also valid
console.log(user3)