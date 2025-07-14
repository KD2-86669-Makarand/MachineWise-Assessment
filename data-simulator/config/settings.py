class Settings:
    WEBSOCKET_URI = "ws://localhost:8080/stream/data"
    SEND_INTERVAL = 1  # in seconds
    SENSORS = [
        {"device_id": "sensor-001", "type": "vibration", "value_range": (0.01, 0.2)},
        {"device_id": "sensor-002", "type": "temp", "value_range": (20, 100)},
        {"device_id": "sensor-003", "type": "current", "value_range": (50, 300)}
    ]

settings = Settings()