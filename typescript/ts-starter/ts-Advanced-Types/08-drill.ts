type User = {
  id: string;
  profile: {
    name: string;
    address: {
      city: string;
    };
  };
};

type City = string;

const myCity: City = "Rajahmundry";

console.log("City:", myCity);

// Try this (uncomment to see error)
// const wrongCity: City = 123; 