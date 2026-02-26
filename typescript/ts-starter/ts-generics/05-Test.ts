type Credentials = {
  username : string;
  password : number;
}

type details = keyof Credentials;      // Gives the keys of the tyoes as union

type UsernameType = Credentials["username"];          // Like automatic syncing -> even if we have union types ...for now 
                                                      // we chose the string


const user1:UsernameType = "Deekshi";
console.log(user1);


const test : UsernameType = "password";
console.log(test);
