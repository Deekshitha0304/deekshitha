function greet(name, age) {
    if (age === void 0) { age = 21; }
    if (age !== undefined) {
        return "Hi ".concat(name, ", age is ").concat(age);
    }
    return "Hi ".concat(name);
}
console.log(greet("Deekshi"));
console.log(greet("Swatii", 22));
