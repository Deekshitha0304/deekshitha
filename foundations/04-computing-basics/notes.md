# Computing Basics — Notes

## Overview

This module helped me build a practical mental model of how my computer actually runs programs. Instead of just running commands blindly, I now understand the relationship between users, files, permissions, processes, and ports. These concepts explain most real-world backend debugging issues.

---

## Key Insights

### 1. User Context Matters

Using `whoami`, `echo $HOME`, and `pwd`, I understood that every command runs under a specific user. File access and process ownership depend on this. Many “permission denied” issues are actually user-context problems.

---

### 2. A Process = A Running Program

Using `ps aux`, I saw that every program (VS Code, Chrome, Python server, etc.) runs as a process with a unique PID.

When I start:


python3 -m http.server 5000



I am creating a new process that listens on a port.

Understanding PID is critical for debugging and killing stuck programs.

3. Permissions Control Execution

Using ls -l and chmod, I learned that files are not executable by default.

Permission format:

            -rwxr-xr-x


            Owner permissions

            Group permissions

            Others permissions

Removing x immediately prevents execution. This explains why scripts sometimes fail even if the code is correct.

The Number Codes

Each permission has a number value:

            Permission	Value
            r	4
            w	2
            x	1

### Server Is Just a Process Listening on a Port

When starting a server on port 5000, I saw that:

Only #one process can use a port at a time.

If I try starting another server on the same port, I get:

            OSError: Address already in use


This is not a bug — it means the OS is protecting the port.

Using:

            lsof -i :5000


I can find:

    #Which process

    #Which PID

    #Which user owns it

Then stop it using:

            kill <pid>


###When a port is busy:

Check which process is using it.
Confirm using ps.
Kill the correct PID.
Verify the port is free.
Restart cleanly.
This is the exact workflow used in backend debugging.




###Main Takeaways

->Everything running on my system is a process.

->Every process runs under a user.

->Permissions control file access and execution.

->A server is simply a process bound to a port.

->Port conflicts are normal and solvable.

->Debugging is about investigation, not guessing.
