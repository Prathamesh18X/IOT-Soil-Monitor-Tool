import React, { useState, useEffect } from 'react';
import RowData from './RowData';
import io from 'socket.io-client';

const App = () => {
  const [sensors, setsensors] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:8080');
    socket.on('app', (received) => {
      updateData(received);
    });

    return () => {
      socket.close();
    };
  }, []);

  const updateData = (received) => {
    setsensors(prevsensors => {
      const sensorList = prevsensors.map(sensor => sensor.name);
      if (sensorList.includes(received.name)) {
        return prevsensors.map(sensor =>
          sensor.name !== received.name ? sensor : { ...received, id: sensor.id }
        );
      } else {
        return [...prevsensors, { ...received, id: createId() }];
      }
    });
  };

  const createId = () => {
    createId.uniqueId = createId.uniqueId || 0;
    return createId.uniqueId++;
  };

  const sensorRows = sensors.map(sensor => <RowData key={sensor.id} {...sensor} />);

  return (
    <div className='container'>
      <div className=' flex flex-row align-middle text-left text-7xl font-extrabold'>
      <img width="200" height="200" src="https://img.icons8.com/color/400/hand-planting.png" alt="hand-planting"/>
      <div className="flex flex-col justify-center">
      <div>Soil Monitoring</div>
      <div className='text-2xl mx-2 font-bold'> IOT tool</div>
      </div>
      </div>
      <div className='spacer' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {sensorRows}
      </div>
    </div>
  );
};

export default App;
