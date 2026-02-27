type TestUser = {
  id: string;
  name: string;
};

async function fetchUser(id: string): Promise<TestUser> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User-${id}` });
    }, 2000); 
  });
}

//Sequential Execution

async function sequential() {                                   // Step 1 -> wait 2 sec

  console.time("Sequential");

  const user1 = await fetchUser("1");
  const user2 = await fetchUser("2");

  console.log(user1, user2);

  console.timeEnd("Sequential");                               // Gives total time
}

sequential();
// sequential() -> waits for first user, then second user, so total time is about 4 seconds.



//Parallel Execution with Promise.all
async function parallel() {
  console.time("Parallel");

  const [user1, user2] = await Promise.all([
    fetchUser("1"),
    fetchUser("2"),
  ]);

  console.log(user1, user2);

  console.timeEnd("Parallel");
}

parallel();

// parallel() -> fetches both users at the same time, so total time is about 2 second.





//Partial Success with Promise.allSettled

async function fetchUserWithFailure(id: string): Promise<TestUser> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === "2") {
        reject("User not found");
      } else {
        resolve({ id, name: `User-${id}` });
      }
    }, 1000);
  });
}

async function parallelSettled() {
  console.time("AllSettled");                                     // Step 2 -> wait another 1 sec

  const results = await Promise.allSettled([
    fetchUserWithFailure("1"),
    fetchUserWithFailure("2"),
  ]);

  console.log(results);

  console.timeEnd("AllSettled");
}

parallelSettled();

// parallelSettled() -> fetches both users and gives result for both, even if one fails.