## Navigation Commands

### `pwd` — Print Working Directory

Shows my current location in the filesystem.



### ls — List Files 

Shows contents of a directory.

ls

Important Flags
    ls -l   # Long format (permissions, owner, size, date)
    ls -a   # Show hidden files
    ls -la  # Long format + hidden files

    Hidden files start with . (like .zshrc, .git).

cd — Change Directory

Moves between folders.

      cd foldername

Special paths:

        . → current directory

        .. → parent directory

        ~ → home directory

        cd - → previous directory



### File & Folder Management
mkdir — Create Folder
mkdir foldername


Create nested folders:

    mkdir -p a/b/c


-p creates parent directories if they don’t exist.

  rm — Remove File
  rm file.txt


Remove directory:

  rm -r foldername


⚠️ -r means recursive. Be careful.

rm -rf is dangerous because:
  -r = recursive
  -f = force (no confirmation)

cp — Copy File
    cp file1.txt file2.txt


Copy folder:

    cp -r folder1 folder2

mv — Move or Rename

Rename:

    mv old.txt new.txt


Move:

    mv file.txt folder/


mv changes file location or name.

### Viewing File Content
cat

Prints entire file content.

    cat file.txt


Not suitable for very large files.

less

Scrollable file viewer.

l    ess file.txt


Controls:

        q → quit

        /word → search

        g → top

        Shift+g → bottom

Better for large files.


head

Shows first 10 lines by default.

      head file.txt


Custom number of lines:

      head -n 5 file.txt

tail

Shows last 10 lines.

        tail file.txt


Live monitoring:

        tail -f file.txt


-f = follow (used for logs).

wc — Word Count
        wc file.txt


Shows:

lines

words

bytes

Specific flags:

      wc -l file.txt   # count lines

      wc -w file.txt   # count words

      wc -c file.txt   # count bytes

### Searching Text — grep

Searches for patterns in text.

        grep "error" file.txt

Useful flags:

      -i → case insensitive

      -n → show line numbers

      -r → recursive search

      -v → invert match (show non-matching lines)

      -c → count matches

Example:

      grep -r "functionName" .


Search entire project directory.

### Pipes (|)

Pipe connects output of one command to input of another.

Example:

      ls | wc -l


Count number of files.

Another example:

        grep error log.txt | wc -l


          ->Count number of error lines.

          ->Pipe allows command chaining.

### Redirection

Controls where output goes.

          > Overwrite
          echo "hello" > file.txt


Creates or overwrites file.

          >> Append
          echo "world" >> file.txt


Adds to existing file without overwriting.

### Shell History

View previous commands:

        history


Search previous commands:

Press:

        Ctrl + R


This helps avoid retyping long commands.

### Shell Configuration — .zshrc

My shell configuration file is:

    ~/.zshrc


It runs every time I open the terminal.

Creating an Alias

Example:

    alias ll="ls -la"


Reload shell:

    source ~/.zshrc

Now I can type:

      ll


## Searching Inside Files — grep

The grep command searches for specific text patterns inside files.

Instead of manually scanning a file, I can search directly for a word, phrase, or pattern.

For example:

Searching for error messages in logs

Finding a function name in project files

Locating configuration values

grep can search inside a single file or across multiple directories. It can also:

Ignore case differences

Show line numbers

Count occurrences

Invert matches (show lines that do not match)

This makes it extremely powerful for debugging and development.

