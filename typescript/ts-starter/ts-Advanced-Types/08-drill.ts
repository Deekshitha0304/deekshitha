type User = {
  id: string;
  profile: {
    name: string;
    address: {
      city: string;
    };
  };
};

type City = User["profile"]["address"]["city"];           // user -> profile -> address -> city -> extract string

//So if tomorrow city changes to number,                  //Indexed Access Type
//City will automatically update.


const myCity: City = "Rajahmundry";


type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]//-> can be array
  | { [key: string]: JsonValue };//-> can be obj



// Used Indexed Access Types to extract nested property type from User.

// City type is derived dynamically instead of hardcoding string.

// Created recursive JsonValue type where the type refers to itself to model JSON structure.