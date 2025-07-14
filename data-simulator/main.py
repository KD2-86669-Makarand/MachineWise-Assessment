import asyncio
from services.data_generator import DataGenerator
from services.websocket_client import WebSocketClient

async def main():
    data_generator = DataGenerator()
    client = WebSocketClient()
    await client.run(data_generator)
    
if __name__ == "__main__":  # ✅ fixed
    print("Starting data simulator...")
    asyncio.run(main())
