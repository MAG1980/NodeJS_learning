const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);

  readStream.pipe(res);
});

const io = socket(server);

io.on("connection", (client) => {
  console.log("New client connected!");

  client.on("client-username", (data) => {
    const payload = {
      message: `${data.userName} is connected`,
    };
    console.log(payload);

    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });

  client.on("client-msg", (data) => {
    // console.log(data);
    const payload = {
      message: data.message.split("").reverse().join(""),
    };

    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });

  client.on("disconnect", () => {
    console.log("Client is disconnected");
    let payload = {
      message: "Client is disconnected",
    };
    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });
});

server.listen(5555);
