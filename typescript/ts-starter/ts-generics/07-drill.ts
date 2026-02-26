type IsString<T> = T extends string ? true : false;
// // IF T is string
//    THEN true
//    ELSE false

type Test1 = IsString<string>;   // true
type Test2 = IsString<number>;   // false



//INFER

// If T is an array…
// extract the type inside the array and call it U.

type ElementType<T> = T extends (infer U)[] ? U : T;
type A = ElementType<string[]>;  // string
type B = ElementType<number[]>;  // number
type C = ElementType<boolean>;   // boolean