// import nanoid from "nanoid";
const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");

const DB_Users = [];

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);

  readStream.pipe(res);
});

const io = socket(server);

var allClients = [];

io.sockets.on("connection", function (socket) {
  allClients.push(socket);
  // console.log(allClients);
  console.log(allClients);
  console.log(allClients.length);
});

io.on("connection", (client) => {
  console.log(`New client with id: ${client.id} connected!`);
  // console.log(client);
  // console.log(client.id);

  client.on("client-reconnection", (data) => {
    client.id = data.userID;
    client.userName = data.userName;
    console.log(
      `Client ${client.userName} with id: ${client.id} id reconnected!`
    );
    console.log(allClients.length);
  });

  client.on("client-username", (data) => {
    console.log(data);
    client.userName = data.userName;

    const payload = {
      userName: client.userName,
      message: `${client.userName} is connected`,
    };

    const payloadWithUserID = {
      ...payload,
      userID: client.id,
    };
    console.log(payloadWithUserID);
    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payloadWithUserID);
    // console.log(payloadWithUserID.userID);
    DB_Users.push({
      userID: payloadWithUserID.userID,
      userName: payloadWithUserID.userName,
    });
    // console.log(DB_Users);
  });

  client.on("client-msg", (data) => {
    console.log(data);
    const payload = {
      userName: data.userName,
      message: data.message.split("").reverse().join(""),
    };

    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });

  client.on("disconnect", () => {
    console.log(
      `Client id: ${client.id} name: ${client.userName} is disconnected`
    );
    let payload = {
      message: "Client is disconnected",
    };
    console.log(allClients);
    let disconnectedUser = allClients.filter((inArrClient) => {
      return inArrClient.id === client.id;
    });
    console.log(disconnectedUser);
    let disconnectedUserIndex = allClients.indexOf(disconnectedUser);
    allClients.splice(disconnectedUserIndex, 1);
    console.log(allClients.length);
    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });
});

server.listen(5555);
