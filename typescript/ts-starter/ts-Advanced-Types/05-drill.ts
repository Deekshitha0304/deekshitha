type PromiseType<T> = T extends Promise<infer U> ? U : T;

type X = PromiseType<Promise<string>>;
type Y = PromiseType<Promise<number>>;
type Z = PromiseType<boolean>;


type Nullable<T> = T | null;
// type NullableString = string | null;
// type NullableNumber = number | null;


type nonNullable<T>= T extends null | undefined ? never : T;
// If T is null or undefined → remove it (return never)
// Otherwise → keep T



// NonNullable<string>      => string
// NonNullable<null>        => never
// NonNullable<undefined>   => never


type NA = NonNullable<string | null | undefined>;    //string

