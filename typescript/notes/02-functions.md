📘 Section 2: TypeScript Functions — Reference Notes

1️⃣ Function Basics – Key Points to Remember

🔹 Functions Must Have Typed Inputs & Outputs

Type annotations are mainly required in:

        Function parameters  
        Return types  
        Callbacks  
        Public APIs  
```bash
function add(a: number, b: number): number {
  return a + b
}
```
Always define return type explicitly.
Prevents accidental return type changes.
Makes refactoring safe.

🔹 Void Return Type

Used when function does not return anything.

```bash
function logMessage(msg: string): void {
  console.log(msg)
}
void = no meaningful return.

```

🔹 never Return Type

Used when function never completes.

```bash

function throwError(message: string): never {
  throw new Error(message)
}
```
never = function does not reach end.

Used in:

        Error throwing  
        Infinite loops  
        Exhaustive checks  
2️⃣ Default & Optional Parameters

🔹 Default Parameters

```bash
function greet(name: string = "Guest"): string {
  return `Hello ${name}`
}
```

Default value automatically makes parameter optional.
Required parameters must come first.

Error you’ll see:

A required parameter cannot follow an optional parameter.

✔ Fix: Move required parameters before optional/default ones.

🔹 Optional Parameters

```bash

function print(message: string, userId?: number) {}
Optional parameter = type | undefined.

```

If using inside function:
```bash

if (userId !== undefined) {}
```

Error you’ll see:

Object is possibly 'undefined'.

✔ Fix: Check before using.

3️⃣ Rest Parameters

Used when number of arguments is unknown.

```bash

function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0)
}
```

Rules:

        Only one rest parameter  
        Must be last parameter  
        Must be array type  

Error you’ll see:

A rest parameter must be last in a parameter list.
4️⃣ Union Types in Functions

Used when parameter can accept multiple types.
```bash

function printId(id: string | number) {
  console.log(id)
}
```

Must narrow before using type-specific methods.

Error you’ll see:

Property 'toUpperCase' does not exist on type 'string | number'.

✔ Correct way:

```bash
if (typeof id === "string") {
  id.toUpperCase()
}
```
5️⃣ Function Overloading

Used when function behaves differently for different input types.

```bash

function combine(a: string, b: string): string
function combine(a: number, b: number): number

function combine(a: any, b: any) {
  return a + b
}
```

Rules:

        Overload signatures on top  
        Only ONE implementation  
        Implementation must handle all types  

Error you’ll see:

This overload signature is not compatible with its implementation.

✔ Fix: Implementation parameters must cover all overload types.

6️⃣ Higher Order Functions (HOF)

A function that:

        Takes a function as argument  
        Returns a function  

Example:

```bash

function applyOperation(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
) {
  return operation(a, b)
}

```

Always type callback parameters.
Never use Function type for callbacks.
7️⃣ Arrow Functions

```bash

const multiply = (a: number, b: number): number => a * b
```

Used in:

        Callbacks  
        Short functions  
        Functional patterns  
Arrow functions have lexical this.
8️⃣ Common Errors in Functions (Very Important)

❌ Missing Return
```bash

function test(a: number): number {
  if (a > 0) return a
}
```

Error:

Not all code paths return a value.

✔ Fix: Ensure all branches return.

❌ Union Without Narrowing
```bash

function test(x: string | number) {
  return x.toUpperCase()
}
```

Error:

Property does not exist on type 'string | number'.

✔ Fix: Narrow first.

❌ Optional Parameter Used Directly
```bash

function test(x?: number) {
  return x.toFixed(2)
}
```

Error:

Object is possibly 'undefined'.

✔ Fix:
```bash

if (x !== undefined) {
  x.toFixed(2)
}
```

❌ Overload Implementation Mismatch

Error:

No overload matches this call.

✔ Fix: Check overload signatures carefully.

9️⃣ When To Use What

If behavior changes based on type
→ Use Union + Narrowing OR Overloading

If unknown number of arguments
→ Use Rest parameters

If optional behavior
→ Use Default parameter

If dynamic logic passed
→ Use Higher Order Function

If function throws error / never completes
→ Use never

🔟 Mental Model for Functions

Always type parameters.

Always type return.

Optional = type | undefined.

Rest = array of values.

Union = narrow before use.

Overload = multiple signatures, one body.

Never use any in function signatures.

If strict mode enabled → handle undefined properly.
