# TypeScript One-Time VS Code Setup – Notes



### 1️⃣ Project Structure (Must Remember)

Always create a separate project folder (e.g., ts-starter)

Never mix module folder and project folder

Correct structure:
```bash

typescript/
  ts-starter/
    src/
    package.json
    tsconfig.json
    .prettierrc
    .gitignore
    .vscode/

```


### 2️⃣ Never Create Nested Git Repositories

⚠️ Do NOT run git init inside subfolders if the root already has Git.

If you see a .git inside a subfolder:

Remove it using 
``` bash
rm -rf .git

```

Re-add the folder from root

Git tracks from one root only.


### 3️⃣ Module System Alignment (Very Important)

If tsconfig.json has:

"module": "ESNext"

Then package.json MUST have:

"type": "module"

Mismatch causes runtime errors.

### 4️⃣ Scripts – What They Actually Do

```bash
"dev"   → Runs TS directly using tsx (development mode)
"build" → Compiles TypeScript to JavaScript (dist/)
"start" → Runs compiled JS from dist/

```

Remember:

            dev = development

            build + start = production-style flow



### 5️⃣ Prettier Setup

.prettierrc must be at project root

Enable 
```bash 
"editor.formatOnSave": true
```

Formatting should be automatic

If formatting doesn't work → check default formatter

### 6️⃣ .gitignore Placement

.gitignore must be at project root.

Must ignore:

            node_modules/
            dist/
            .DS_Store

Git does NOT track empty folders.



### 7️⃣ VS Code Local TypeScript Version

In .vscode/settings.json:

"typescript.tsdk": "node_modules/typescript/lib"

This ensures:

VS Code uses local TS version

No global TypeScript conflicts



### 8️⃣ pnpm Standardization

Use pnpm only (not npm, not yarn)

Use pnpm add -D for dev dependencies

Lockfile: pnpm-lock.yaml

### 9️⃣ How to Stop Dev Server

If terminal is stuck after:

pnpm dev

Press:
``` bash
Ctrl + C
```


### 🔟 Common Mistakes to Avoid

Running git init twice

Mixing CommonJS and ES Modules

Forgetting "type": "module"

Putting config files inside src/

Forgetting to save files before committing

Expecting empty folders to appear on GitHub

Final Checklist Before Starting Drills

pnpm dev works

pnpm build && pnpm start works

No nested .git

GitHub shows all project files

Folder structure is clean

If all above are true → setup is correct.