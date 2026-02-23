### 📘 Section 1: TypeScript Foundations — Reference Notes
# 1️⃣ Core Concepts – Key Points to Remember

🔹 TypeScript = JavaScript + Static Types

# Types exist only at compile time.

# TypeScript compiles to JavaScript.

# Node runs .js, not .ts.

🔹 Type Inference

TS automatically detects type when assigning value.

```bash
let age = 21  // inferred as number
```

Once inferred, type cannot change.

Error you’ll see:

# Type 'string' is not assignable to type 'number'.

🔹 Explicit Type Annotation

Used when:

            Function parameters

            Return types

            Complex objects

            Public APIs
 ```bash
let name: string = "Deekshi"
```

🔹 Type Checking

TypeScript checks:

            Variable assignment

            Function parameters

            Return types

            Object shape

            Array contents

🔹 Strict Mode (Very Important)

            In tsconfig.json:
```bash
"strict": true
```
Enables:

            strictNullChecks

            noImplicitAny

            strictFunctionTypes

etc.

# Without strict → unsafe behavior allowed.

# 2️⃣ Important Commands to Remember
```bash

Initialize project
npx tsc --init
Compile single file
npx tsc test.ts
Watch mode
npx tsc --watch
Run JS
node test.js
Direct execution (optional)
npx ts-node test.ts

```


# 3️⃣ Common Errors You Will Face (And Meaning)

❌ Type Mismatch

```bash
let age: number = "21"
```

Error:

# Type 'string' is not assignable to type 'number'.

✔ Fix: Correct type or value.

❌ Argument Type Error
```bash
function add(a: number) {}
add("10")
```

Error:

# Argument of type 'string' is not assignable to parameter of type 'number'.

✔ Fix: Pass correct type.

❌ Property Does Not Exist
```bash
let value: unknown = "hello"
value.toUpperCase()
``` 

Error:

# Object is of type 'unknown'.

✔ Fix: Type narrow first.

❌ Object Shape Error
```bash
let user: { name: string } = { name: "A", age: 20 }
```

Error:

# Object literal may only specify known properties.

✔ Fix: Add property in type definition.

❌ Null Error (Strict Mode)
```bash
let name: string = null
```

Error:

# Type 'null' is not assignable to type 'string'.

✔ Fix:

```bash
let name: string | null = null
❌ Possibly Undefined
let arr: number[] = []
let x = arr.pop()
x.toFixed(2)
```

Error:

# Object is possibly 'undefined'.

✔ Fix:

```bash
if (x !== undefined) {
  x.toFixed(2)
}
```
# 4️⃣ any vs unknown – Errors & Behavior

🔥 any

```bash
let value: any = 10
value = "hello"
value.toFixed(2)
```

# No compile error.
# Runtime crash possible.

Problem:

No safety.

No checking.

🔥 unknown

let value: unknown = "hello"
value.toUpperCase()

Error:

# Object is of type 'unknown'.

✔ Correct way (Type Narrowing):

```bash
if (typeof value === "string") {
  value.toUpperCase()
}
```

# 5️⃣ Type Narrowing – How to Do It

Type narrowing = reducing a broad type into specific type using checks.

🔹 Using typeof
if (typeof value === "string") {}
if (typeof value === "number") {}
if (typeof value === "boolean") {}
🔹 Using Array.isArray
if (Array.isArray(value)) {}
🔹 Using null check
if (value !== null) {}
🔹 Using in operator
if ("name" in obj) {}
🔹 Using instanceof
if (value instanceof Date) {}


# 6️⃣ Errors in Drills (Very Common)
1. Changing inferred type
let score = 10
score = "high"

Error:

Type 'string' is not assignable to type 'number'.
2. Wrong array push
let skills: string[] = ["js"]
skills.push(100)

Error:

Argument of type 'number' is not assignable to parameter of type 'string'.
3. Calling number method on string
let x = "10"
x.toFixed(2)

Error:

Property 'toFixed' does not exist on type 'string'.
4. Using pop without checking
let x = arr.pop()
x.toFixed(2)

Error:

Object is possibly 'undefined'.
5. Implicit any (strict mode)
function greet(name) {}

Error:

Parameter 'name' implicitly has an 'any' type.

✔ Fix:

```bash
function greet(name: string) {}
```

# 7️⃣ Words You Will See in Error Messages

-> not assignable

->implicitly has an 'any' type

->property does not exist

->object is possibly 'undefined'

->object is of type 'unknown'

->expected X but got Y

->type 'null' is not assignable

->type 'undefined' is not assignable

->Understand these phrases → you can decode any TS error.

# 8️⃣ Mental Model for Foundations

Inference first.

->Explicit type when needed.

->Never use any casually.

->Narrow before using unknown.

->Always check for null / undefined.

->Strict mode must be enabled.

->Functions must have typed inputs & outputs.