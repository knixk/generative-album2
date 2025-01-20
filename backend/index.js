const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = process.env.PORT || 5051;
const socketPort = process.env.SOCKET_IO_PORT || 3000;
dotenv.config();

const mainFn = async () => {};
console.log(`App running on port: ${port}`);

const io = require("socket.io")(socketPort, {
  cors: { origin: "*" }, // Allow all origins
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("new-image", (image) => {
    io.emit("update-album", image); // Broadcast to all clients
    console.log("Received image and sendign to frontend")
    console.log(image)
  });
});
app.listen(port, mainFn);
