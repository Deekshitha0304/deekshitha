export {};

class Semaphore {
  private queue: (() => void)[] = [];
  private count: number;

  constructor(private limit: number) {
    this.count = limit;
  }

  async acquire(): Promise<void> {
    if (this.count > 0) {
      this.count--;
      return;
    }

    return new Promise((resolve) => {
      this.queue.push(resolve);
    });
  }

  // Semaphore controls how many tasks can run at same time.



  release(): void {
    this.count++;

    if (this.queue.length > 0) {
      this.count--;
      const next = this.queue.shift();
      next?.();
    }
  }
}



async function runWithLimit<T>(
  limit: number,
  tasks: (() => Promise<T>)[]
): Promise<T[]> {

  const semaphore = new Semaphore(limit);
  const results: T[] = [];

  await Promise.all(
    tasks.map(async (task, index) => {
      await semaphore.acquire();

      try {
        const result = await task();
        results[index] = result;
      } finally {
        semaphore.release();
      }
    })
  );

  return results;
}

// runWithLimit ensures only 'limit' tasks execute concurrently.





function createTask(id: number): () => Promise<string> {
  return async () => {
    console.log("Starting task", id);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    console.log("Finished task", id);
    return `Result ${id}`;
  };
}

const tasks = [
  createTask(1),
  createTask(2),
  createTask(3),
  createTask(4),
];

runWithLimit(2, tasks).then((results) => {
  console.log("All Done:", results);
});