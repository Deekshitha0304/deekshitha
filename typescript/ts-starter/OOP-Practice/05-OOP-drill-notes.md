Inheritance vs Composition — Future Reference Notes


## 1. Core Idea

### Inheritance

->Models IS-A relationship.

->Child class extends parent.

->Child automatically gets all parent behavior.

->Uses extends and super.

Example:
```bash

        class BoundedCounter extends Counter

```
-> BoundedCounter is a Counter.


### Composition

-> Models HAS-A relationship.

-> Class contains another object.

-> Delegates behavior explicitly.

-> No extends.

Example:
```bash 

    class BoundedCounter {
        constructor(private inner: Counter, private max: number) {}
    }

```
-> BoundedCounter has a Counter.

## 2. Structural Difference

### Inheritance

-> Tight coupling to parent.

-> Child depends on parent internals.

-> Parent changes may break children.

Structure becomes:

     Base
      ↓
    Advanced
      ↓
    Bounded
      ↓
    Logged
      ↓
    Secure

-> This becomes fragile.

### Composition


-> No deep hierarchy.

-> Small reusable building blocks.

Structure becomes:

    Counter
    + Logger
    + Bounded
    + Persistence

Composable and modular.

## 3. Why Composition is Preferred in Production

1. Avoids Fragile Base Class Problem

Changing parent logic in inheritance may unintentionally break subclasses.

Composition isolates behavior.


2. Easier Testing

With composition:

```bash new BoundedCounter(new MockCounter(), 10) ```

-> You can inject mock objects.

-> Inheritance makes mocking harder.


5. Design Principle

### Favor Composition Over Inheritance

-> Use inheritance only when:

-> Relationship is truly IS-A

-> Behavior is stable


### Use composition when:

-> System will evolve

-> Behavior combinations may change

-> Flexibility is required

6. Mental Model

            Inheritance = Tree 🌳

            -> Rigid

            -> Hard to reshape

            Composition = LEGO 🧱

            -> Modular

            -> Replaceable

            -> Easy to evolve

7. Final Takeaway

In small projects:
Inheritance is fine.

In large production systems:
Composition scales better.
