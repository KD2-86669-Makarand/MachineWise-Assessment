import random
from datetime import datetime, timezone
from models.sensor_data import SensorData
from config.settings import settings

class DataGenerator:
    @staticmethod
    def generate_sensor_data():
        data = []
        for sensor in settings.SENSORS:
            value = round(random.uniform(*sensor["value_range"]), 2)
            data.append(SensorData(
                device_id=sensor["device_id"],
                timestamp=datetime.now(timezone.utc).isoformat(),
                type=sensor["type"],
                value=value
            ))
        return data
