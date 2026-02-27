Timeline Tracking
Time = 0 sec

Semaphore count = 2

Task 1 calls acquire() → count becomes 1 → starts

Task 2 calls acquire() → count becomes 0 → starts

Task 3 calls acquire() → count = 0 → waits in queue

Task 4 calls acquire() → count = 0 → waits in queue

Console:

Starting task 1
Starting task 2

Only 2 tasks running. 



Time = 1 sec

Task 1 finishes.

Console:

Finished task 1

release() runs:

count increases



Next waiting task (Task 3) is allowed to start

Console:

Starting task 3

Now running:

Task 2

Task 3

Still only 2 running. 

Also at ~1 sec:

Task 2 finishes.

Console:

Finished task 2

release() runs:




Task 4 starts

Console:

Starting task 4

Now running:

Task 3

Task 4

Still 2 running. 

Time = 2 sec

Task 3 finishes:

Finished task 3


Task 4 finishes:

Finished task 4

Finally:

All Done: [ 'Result 1', 'Result 2', 'Result 3', 'Result 4' ]
📊 Final Output Order
Starting task 1
Starting task 2
Finished task 1
Starting task 3
Finished task 2
Starting task 4
Finished task 3
Finished task 4
All Done: [...]