VS Code Drill Notes
### 1. Open a Folder
What I Did

Opened the ~/work folder inside VS Code.

Why This Is Important

A folder is the root workspace.

All files, configs, and Git operations work relative to this folder.

Professional projects always start by opening the correct root directory.

Command (Optional)
            code ~/work
### 2. Integrated Terminal
What I Did

Opened the terminal inside VS Code and ran:

            pwd
What pwd Means

pwd = Print Working Directory

It shows the current folder path.

Why This Is Important

Helps verify you are inside the correct directory.

Prevents mistakes like creating files in the wrong location.

Very important in real projects.

### 3. Extensions
Installed Extensions

        ESLint

        Prettier

        GitLens

        Markdown All in One

Why Each Is Used
# ESLint

Finds code errors.

Enforces coding standards.

Improves code quality.

# Prettier

Automatically formats code.

Keeps code clean and consistent.

Avoids formatting conflicts in teams.

# GitLens

Shows Git history inside VS Code.

Displays who changed what and when.

Helps understand project changes.

# Markdown All in One

Helps write Markdown easily.

Adds shortcuts and formatting tools.

Useful for documentation (like this file).

### 4. Settings Configuration

Configured the following:

# Auto Save → On Focus Change

Saves file automatically when switching tabs.

Prevents accidental data loss.

# Format on Save → Enabled

Automatically formats code when saving.

Works with Prettier.

Keeps formatting consistent.

# Font → JetBrains Mono

Programming-friendly font.

Improves readability.

Better alignment for code.

# Tab Size → 2

Indentation = 2 spaces.

Clean and modern standard (especially in JS/TS projects).

Keeps code compact and readable.

### 5. Navigation
Quick Open

Shortcut:

            Cmd + P

Quickly open files by name.

Faster than clicking through folders.

Global Search

Shortcut:

            Cmd + Shift + F

Search for text across entire project.

Extremely useful in large projects.

Why Navigation Matters

In real projects, files are large and many.

Speed in navigation = productivity.

### 6. Git Inside VS Code
Basic Workflow

Make a change in a file.

Go to Source Control panel.

Stage the file.

Write commit message.

Commit.

Why This Is Important

Tracks changes.

Maintains project history.

Essential for collaboration.

### 7. Remote SSH
What It Means

Connect to a remote cloud server (VM) using SSH from VS Code.

Why We Use It

Work directly on remote machines.

Deploy or manage cloud servers.

Edit files remotely like local files.

Example SSH Command

            ssh username@server-ip

After connecting:

Create files

Edit files

Run commands remotely
