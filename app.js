import express from "express";
import mqtt from "mqtt";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import deviceRoutes from "./routes/device.routes.js";
import connectToMongoDB from "./db/connect.js";

dotenv.config();

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
  },
});


app.use(cors());
app.use(express.json());

const options = {
  keepalive: 0,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  reconnectPeriod: 5000,
  connectTimeout: 20 * 1000,
  rejectUnauthorized: false,
};

const connectUrl = process.env.MQTT_SERVER;
var client = mqtt.connect(connectUrl, options);

client.on("error", function (err) {
  console.log(err);
  client.end();
});

client.on("connect", () => {
  console.log("Connected to MQTT server");
  client.subscribe("app");
  client.subscribe("device/status");
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    // Handle socket disconnection if needed
  });
});

client.on("message", (topic, message) => {
  const verifyJSON = (json) => {
    let parsed;
    try {
      parsed = JSON.parse(json);
    } catch (err) {
      console.error("error", err);
    }
    return parsed;
  };

   if (topic === "app") {
    const received = verifyJSON(message);
    if (received && received.name) {
      io.emit("app", received);
    }
  }
});

app.use("/api/devices", deviceRoutes);

http.listen(8080, () => {
  console.log("Listening on port 8080");
  connectToMongoDB();
});

export {io}