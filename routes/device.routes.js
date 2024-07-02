import express from "express";
import Device from "../models/device.model.js";
import {io} from "../app.js"
const router = express.Router();


const getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addDevice = async (req, res) => {
    try {
        const sn = req.body.sn;
        const device = await Device.findOne({ _id: sn });
        if (device) {
            return res.status(400).json({ error: "Device already exists" });
        } else {
            const newDevice = new Device({
                _id: sn,
                name: `sensor-${sn}`,
                status: "Offline",
            });
            io.emit("DEVICE_ADDED", newDevice);
            await newDevice.save();
            res.status(201).json(newDevice);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

router.get("/", getDevices);
router.post("/addDevice", addDevice);

export default router;
