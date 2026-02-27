
JS see setTimeout
            |
handles timer to node env
            |
env starts timer 
            |
js continues its work
            |
after timer ends the result is pushed to queue
            |
when call stacks gets free -> then callback runs
            |
inside that resolve will run and executed


```bash
async makes function return Promise.

setTimeout simulates async delay.

resolve() completes the Promise.

await unwraps the Promise.

Without await, you only get the Promise object.
```