type User11 = {
  id: string;
  name: string;
  email: string;
};

//Create fetchUser with setTimeout

async function fetchUser1(id: string): Promise<User11> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "Deekshi",
        email: "deekshi@example.com",
      });
    }, 1000);
  });
}


// Call It from Another Async Function (Using await)

async function main() {
  const user = await fetchUser("101");

  console.log("Fetched User:", user);
  console.log("User Name:", user.name);
}

main();                                     // After 1 sec data will be fetched

//fetchUser() → returns Promise<User>

//await → unwraps it into User



//Remove await Accidentally
async function test() {
  const user = fetchUser("101"); //  No await

  console.log("User:", user);
//   console.log("User Name:", user.name); //  Error
}

