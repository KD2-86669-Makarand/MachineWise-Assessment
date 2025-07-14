from datetime import datetime, timezone
from dataclasses import dataclass
import json

@dataclass
class SensorData:
    device_id: str
    timestamp: str
    type: str
    value: float
    
    def to_json(self):
        return json.dumps({
            "device_id": self.device_id,
            "timestamp": self.timestamp,
            "type": self.type,
            "value": self.value
        })

