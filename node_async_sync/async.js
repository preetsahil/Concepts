const fs = require("fs");

console.log("1");
//block the code till file read is complete
const res = fs.readFile("text.txt", (err, data) =>
  console.log(data.toString())
);
console.log("2");

//Output:
// 1
// 2
// sahil
