import asyncio
import websockets
import json
from config.settings import settings
from models.sensor_data import SensorData

class WebSocketClient:
    def __init__(self):
        self.uri = settings.WEBSOCKET_URI

    async def run(self, data_generator):
        try:
            async with websockets.connect(self.uri) as websocket:
                print("Connected to WebSocket server.")

                while True:
                    sensor_data_list = data_generator.generate_sensor_data()
                    for data in sensor_data_list:
                        await websocket.send(data.to_json())
                        print(f"Sent: {data.to_json()}")

                    await asyncio.sleep(settings.SEND_INTERVAL)

        except websockets.exceptions.ConnectionClosed as e:
            print(f"WebSocket closed: {e}")
            await asyncio.sleep(5)
            await self.run(data_generator)  # Optional: retry on disconnect

        except Exception as e:
            print(f"WebSocket error: {e}")
            await asyncio.sleep(5)
            await self.run(data_generator)
