import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState({ temperature: 0, humidity: 0 });
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://localhost:9001');  // WebSocket port for Mosquitto
    setClient(mqttClient);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('sensor/data');
    });

    mqttClient.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());
      setSensorData(data);
    });

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sensor Data</h1>
        <p className="text-lg">Temperature: {sensorData.temperature}°C</p>
        <p className="text-lg">Humidity: {sensorData.humidity}%</p>
      </div>
    </div>
  );
};

export default App;