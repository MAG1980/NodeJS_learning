const fs = require("fs");
// const fsPromises = require("fsPromises");
const readline = require("readline");

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
// const writeStream1 = fs.createWriteStream('../89.123.1.41_requests.log', 'utf-8');
// const writeStream2 = fs.createWriteStream('../34.48.240.111_requests.log', 'utf-8');

// readStream.on("data", (chunk) => console.log(chunk));


const rl = readline.createInterface( { input: readStream, terminal: true });

// rl.on('line', (line) =>{
//   if (line.includes('89.123.1.41')){
//     writeStream1.write(line + "\n")
//   }
//   if (line.includes('34.48.240.111')){
//     writeStream2.write(line + "\n")
//   }
//   })

let adresses = ['89.123.1.41','34.48.240.111'];

adresses.forEach((adress) => {
  const writeStream = fs.createWriteStream(`./${adress}_requests.log`, 'utf-8');
  rl.on('line', (line) =>{
    if (line.includes(adress)){
      writeStream.write(line + "\n")
    }
  })
})