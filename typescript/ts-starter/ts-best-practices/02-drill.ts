type drill = {
  readonly id: string;
  readonly name: string;
};

function updateUserName(
  users: readonly drill[],
  id: string,
  newName: string
): drill[] {
  return users.map(user =>
    user.id === id
      ? { ...user, name: newName } // new object
      : user
  );
}


const users: readonly drill[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" }
];

const updated = updateUserName(users, "1", "Alicia");

console.log(users[0].name);  