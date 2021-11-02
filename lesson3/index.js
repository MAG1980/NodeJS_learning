const fs = require("fs");
// const fsPromises = require("fsPromises");
const readline = require("readline/promises");

const ACCESS_LOG = "./access.log";
// const data = fs.readFile(ACCESS_LOG, "utf8", (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//      {
//     });
// fsPromises
//   .readFile(ACCESS_LOG, "utf-8")
//   .then(console.log(date))
//   .catch(console.log(err));

//fs.ReadStream(); class
//fs.createReadStream(); обёртка над class

const readStream = fs.createReadStream(ACCESS_LOG, {
  flags: "r",
  encoding: "utf-8",
  start: 0,
  end: 1048576,
  highWaterMark: 256,
});

// readStream.on("data", (chunk) => console.log(chunk));

readline.on("line", (input) => {
  console.log(`Received: ${input}`);
});
