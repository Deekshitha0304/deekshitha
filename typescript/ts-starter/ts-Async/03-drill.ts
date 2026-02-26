type TestUser = {
  id: string;
  name: string;
};

async function fetchUser(id: string): Promise<TestUser> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User-${id}` });
    }, 1000); // 1 second delay
  });
}

//Sequential Execution

async function sequential() {                                   // Step 1 → wait 1 sec
                                                                // Step 2 → wait another 1 sec
                                                                // ⏳ Total ≈ 2 seconds

  console.time("Sequential");

  const user1 = await fetchUser("1");
  const user2 = await fetchUser("2");

  console.log(user1, user2);

  console.timeEnd("Sequential");
}

sequential();



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
  console.time("AllSettled");

  const results = await Promise.allSettled([
    fetchUserWithFailure("1"),
    fetchUserWithFailure("2"),
  ]);

  console.log(results);

  console.timeEnd("AllSettled");
}

parallelSettled();