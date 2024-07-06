const fs = require("fs");

console.log("1");
//block the code till file read is complete
const res = fs.readFileSync("text.txt");
console.log("file: "+ res);
console.log("2");

//Output:
// 1
// file: sahil
// 2
