interface Room{
    Name : string;
    Doors : number;
}

const Kitchen : Room ={
    Name : "Kitchen",
    Doors : 2
};
console.log(Kitchen);

const Hall : Room ={
    Name : "Hall",
    Doors:3
};
console.log(Hall);

interface bedroom extends Room {
    fans : number;
}

const guestroom : bedroom ={
    Name : "Guest",
    Doors : 4,
    fans : 2
}
console.log(guestroom)


