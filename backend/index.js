const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = process.env.PORT || 5051;
const socketPort = process.env.SOCKET_IO_PORT || 3000;
const os = require("os");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
dotenv.config();

const UPLOAD_DIR = path.join(__dirname, "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

app.use(cors());
app.use(express.json());
app.use("/images", express.static(UPLOAD_DIR));

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

const mainFn = async () => {
  console.log(`App running on port: http://localhost:${port}`);
};

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

app.get("/", async (req, res) => {
  res.status(200).json({
    msg: "api is functional...",
    code: 200,
    response: {},
  });
});

// Route to download and store image
app.post("/upload-image", async (req, res) => {
  try {
    console.log("=================== inside upload image ===================");
    console.log("im req.body", req.body);
    const { imageUrl } = req.body;

    if (!imageUrl) {
      console.log("url not found");
      return res.status(400).json({ error: "Image URL is required" });
    }

    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    });

    console.log(response);

    const imageBuffer = Buffer.from(response.data, "binary");
    const imageName = `image_${Date.now()}.jpg`;
    const imagePath = path.join(UPLOAD_DIR, imageName);

    fs.writeFileSync(imagePath, imageBuffer);

    res.json({ success: true, imagePath: `/images/${imageName}` });

    console.log(
      "==========x========= inside upload image =========x=========="
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to download image" });
  }
});

// Route to get all stored images
app.get("/get-images", (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: "Failed to read directory" });
    res.json({ images: files.map((file) => `${file}`) });
  });
});

app.listen(port, mainFn);
