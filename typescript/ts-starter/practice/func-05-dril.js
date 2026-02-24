function format(input) {
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    else {
        return input.toFixed(2);
    }
}
console.log(format("Deekshi"));
console.log(format(578.675675));
