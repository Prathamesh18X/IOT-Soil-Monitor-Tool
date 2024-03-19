require("dotenv").config();
const express = require("express");
const mqtt = require("mqtt");
const cors = require("cors");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

var options = {
  keepalive: 0,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  reconnectPeriod: 5000,
  connectTimeout: 20 * 1000,
  // username: process.env.MQTT_USERNAME,
  // password: process.env.MQTT_PASSWORD,
  rejectUnauthorized: false,
};

const connectUrl = process.env.MQTT_SERVER;
var connectedClients = 0;

var client = mqtt.connect(connectUrl, options);
client.on("error", function (err) {
  console.log(err);
  client.end();
});

client.on("connect", () => {
  console.log("Connected");
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    connectedClients--;
    console.log("Client left: ", connectedClients);
  });
  connectedClients++;
  console.log("New client: ", connectedClients);
});

client.subscribe("app");
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
  var received = verifyJSON(message);
  console.log("Topic: " + topic + "\nMessage: ", JSON.stringify(received));
  io.emit("app", received);
});

http.listen(8080, () => {
  console.log("Listening on port 8080");
});
