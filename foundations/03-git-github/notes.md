# Git & GitHub Setup — Notes

## Overview

In this module, I set up Git and GitHub properly on my machine and understood how version control works in a structured way. I learned not only how to push code, but how Git tracks changes, how authentication works, and how to maintain a clean and professional repository.

---

## Key Insights

### 1. Configuring Git Identity

I configured Git globally using:

```bash
git config --global user.name "My Name"
git config --global user.email "myemail@example.com"
git config --list
```
This ensures every commit is properly attributed. I understood that commits are linked to my GitHub account through this email.

### 2. Generating and Connecting SSH Keys

Instead of using HTTPS authentication repeatedly, I set up SSH.

To generate a key:

            ssh-keygen -t ed25519 -C "myemail@example.com"


This created:

            Private key → ~/.ssh/id_ed25519

            Public key → ~/.ssh/id_ed25519.pub

I copied the public key:

            cat ~/.ssh/id_ed25519.pub


Then added it to GitHub under:
        Settings → SSH and GPG Keys → New SSH Key.

To test connection:

            ssh -T git@github.com


If successful, GitHub confirmed authentication.

This helped me understand:

# Private key stays secure on my machine.

# Public key is shared with GitHub.

# SSH provides secure, password-less authentication.


### 3. Repository Structure Discipline

Git must be initialized at the course repo root:

            git init


-> Not inside module folders. This ensures proper version tracking across the whole project.

### 4. Branching Workflow

I created a feature branch:

            git checkout -b feature/workflow-update


After editing, I used:

            git add .
            git commit -m "Updated workflow"
            git push -u origin feature/workflow-update


Then merged back to main.

-> I understood that branches allow safe, isolated development.

### 5. .gitignore and Binary Awareness

I created a .gitignore file to prevent committing:

node_modules/

.env

.DS_Store

*.log

Git works best with text files, not large binary files or compiled artifacts.


### 6. History and Releases

I explored:

            git log
            git diff
            git show


Then created a tag:

            git tag v0.1.0
            git push origin v0.1.0


# Tags mark stable milestones in project history.


### Main Takeaways

-> Git tracks changes, not just files.

->SSH authentication is secure and efficient.

->Branches protect the main codebase.

->Clean repositories require discipline.

->Versioning adds structure to development.