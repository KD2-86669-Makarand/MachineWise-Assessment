# MachineWise-Assessment

Practical Assessment

A complete system for simulating, receiving, storing sensor data.

## Components

1. **Data Simulator** (Python)

   - Generates random sensor data
   - Sends data via WebSocket
   - Configurable settings

2. **Data Receiver** (Node.js)
   - WebSocket server for receiving data
   - MongoDB storage
   - Real-time alerts
   - REST API for querying data

## Setup

### Prerequisites

- Python 3.7+
- Node.js 14+
- MongoDB

### Data Simulator

1. Install dependencies:
   ```bash
   cd data-simulator
   pip install websockets
   python main.py
   ```

### Data Reciever

1. Install dependencies:
   ```bash
   cd data-reciever
   npm install express ws mongoose socket.io
   node server.js
   ```
