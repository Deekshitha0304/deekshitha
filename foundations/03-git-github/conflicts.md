# How I Will Handle Merge Conflicts

If a merge conflict happens:

1. Run git status to see which files are conflicted.
2. Open the file and look for conflict markers:
   <<<<<<<
   =======
   >>>>>>>
3. Decide which changes to keep.
4. Remove the conflict markers.
5. Stage the resolved file.
6. Commit the resolution.

Important:
Conflicts are normal and not something to panic about.
