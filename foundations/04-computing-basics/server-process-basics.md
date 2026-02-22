# Server & Process Debugging Simulation

## Step 1: Start Server

Started server:

```bash
python3 -m http.server 5000
```

Server output:
Serving HTTP on port 5000

Understanding:
A Python process started and began listening on port 5000.

---

## Step 2: Identify Process Using Port

Command used:

```bash
lsof -i :5000
```

Observed:
- COMMAND: Python
- PID: <your_pid>
- USER: deekshi.ch

Understanding:
This command shows which process is using a specific port.

---

## Step 3: Confirm Using ps

```bash
ps -p <your_pid> -o pid,user,command
```

Verified:
- Correct process ID
- Owner
- Exact command used

---

## Step 4: Verify Server in Browser

Opened:
http://localhost:5000

Confirmed server is working.

---

## Step 5: Kill Process

Used:

```bash
kill <your_pid>
```

Verified:

```bash
lsof -i :5000
```

No output → Port is free.

Understanding:
Killing the process stops the server and releases the port.

---

## Step 6: Restart on New Port

Started server again:

```bash
python3 -m http.server 7000
```

Verified using:
```bash
lsof -i :7000
```

Opened:
http://localhost:7000

Server running successfully.

---

## Key Learnings

- A server is a process.
- A process listens on a port.
- lsof identifies port usage.
- ps confirms process details.
- kill stops the process.
- Ports must be free before reuse.
