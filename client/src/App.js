import React, { useState, useEffect } from "react";
import RowData from "./components/RowData";
import io from "socket.io-client";
import AddDevice from "./components/AddDevice";

const App = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/devices");
        const data = await response.json();
        setSensors(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    socket.on("DEVICE_ADDED", (newDevice) => {
      setSensors((prevSensors) => [...prevSensors, newDevice]);
    });
    socket.on("app", (received) => {
      updateData(received);
    });

    return () => {
      socket.close();
    };
  }, []);

  const updateData = (received) => {
    setSensors((prevSensors) => {
      const existingSensor = prevSensors.find((sensor) => sensor.name === received.name);

      if (existingSensor) {
        const updatedSensors = prevSensors.map((sensor) =>
          sensor.name === received.name ? { ...sensor, ...received } : sensor
        );
        return updatedSensors;
      } else {
        return [...prevSensors, received];
      }
    });
  };

  const sensorRows = sensors.map((sensor) => (
    <RowData key={sensor._id} {...sensor} />
  ));

  return (
    <div className="container">
      <div className=" flex flex-row align-middle text-left text-4xl font-extrabold sm:text-7xl">
        <img
          className="w-[125px] h-[125px] sm:w-[200px] sm:h-[200px]"
          width="200"
          height="200"
          src="https://img.icons8.com/color/400/hand-planting.png"
          alt="hand-planting"
        />
        <div className="flex flex-col justify-center">
          <div>Soil Monitoring</div>
          <div className="text-2xl mx-2 font-bold"> IOT tool</div>
        </div>
      </div>
      <div className="spacer" />
      <div className="p-4">
        <AddDevice />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorRows}
      </div>
    </div>
  );
};

export default App;
