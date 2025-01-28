  const dotenv = require("dotenv");
  const express = require("express");
  const app = express();
  const port = process.env.PORT || 5051;
  const socketPort = process.env.SOCKET_IO_PORT || 3000;
  const os = require("os");
  dotenv.config();

  const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
    return "127.0.0.1"; // Fallback
  };

  const ip = getLocalIp();
  console.log(ip);

  const mainFn = async () => {};
  console.log(`App running on port: http://${ip}:${port}`);

  const io = require("socket.io")(socketPort, {
    cors: { origin: "*" }, // Allow all origins
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("new-image", (image) => {
      io.emit("update-album", image); // Broadcast to all clients
      console.log("Received image and sending to frontend");
      console.log(image);
    });
  });
  app.listen(port, mainFn);

  app.get("/", async (req, res) => {
    res.status(200).json({
      msg: "api is functional...",
      code: 200,
      response: {},
    });
  });
