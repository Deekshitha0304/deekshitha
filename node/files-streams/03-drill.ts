const text = "Hello 🌍";                            // letter and emoji have diff bytes so buffer.length and text.length are diff
const buffer = Buffer.from(text, "utf8");


console.log("Original string:", text);
console.log("Buffer:", buffer);



const backToString = buffer.toString("utf8");
console.log("Converted back:", backToString);




const base64Encoded = buffer.toString("base64");
console.log("UTF-8 string:", buffer.toString("utf8"));
console.log("Base64 encoded:", base64Encoded);




const tenBytes = Buffer.alloc(10, 0xff);
console.log("10-byte buffer filled with 0xff:", tenBytes);



console.log("String length (characters):", text.length);
console.log("Buffer length (bytes):", buffer.length);