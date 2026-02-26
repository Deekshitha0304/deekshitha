function processValue(input: string | number): void {
    if (typeof input === "string") {
        console.log("String length:", input.length);
    } else {
        console.log("Fixed number:", input.toFixed(2));
    }
}

processValue("hello");
processValue(42.867675);



function processValue2(input: string | number | null): void {
    if (input === null) {
        console.log("Value is null");
    } 
    else if (typeof input === "string") {
        console.log("String length:", input.length);
    } 
    else {
        console.log("Fixed number:", input.toFixed(2));
    }
}

processValue2(null);
processValue2("hi");
processValue2(10);




function processValue3(input: string | number | null | Date): void {
    if (input === null) {
        console.log("Value is null");
    } 
    else if (typeof input === "string") {
        console.log("String length:", input.length);
    } 
    else if (typeof input === "number") {
        console.log("Fixed number:", input.toFixed(2));
    } 
    else if (input instanceof Date) {                                       // typeof NOT for objects like Date.
        console.log("Year:", input.getFullYear());
    }
}
