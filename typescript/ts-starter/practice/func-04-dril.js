function toArray(name, phone) {
    if (phone !== undefined) {
        return "Hi ".concat(name, ",Ur phone number is ").concat(phone);
    }
    return "Hi ".concat(name);
}
console.log(toArray("Deekshi"));
console.log(toArray("Swati", 6656454564));
