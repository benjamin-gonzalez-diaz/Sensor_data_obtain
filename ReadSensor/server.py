from flask import Flask
import paho.mqtt.client as mqtt
import json
import random  # We'll use this to simulate sensor data
import time

app = Flask(__name__)

# MQTT setup
mqtt_broker = "localhost"
mqtt_port = 1883
mqtt_topic = "sensor/data"

client = mqtt.Client()
client.connect(mqtt_broker, mqtt_port)

def read_sensor():
    # Simulate reading from a sensor
    return {
        "temperature": round(random.uniform(20, 30), 2),
        "humidity": round(random.uniform(40, 60), 2)
    }

@app.route('/publish_data')
def publish_data():
    data = read_sensor()
    client.publish(mqtt_topic, json.dumps(data))
    return "Data published", 200

if __name__ == '__main__':
    app.run(debug=True)