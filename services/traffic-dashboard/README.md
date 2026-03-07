# Traffic Monitoring Dashboard

This is a modern, professional DevOps dashboard for real-time traffic monitoring.

## Features
- **Real-time Stats**: Total vehicles, average traffic, and congestion hotspots.
- **Dynamic Charts**:
  - **Volume Over Time**: Line chart showing traffic trends per location.
  - **Infrastructure Distribution**: Bar chart comparing traffic across different nodes.
- **Congestion Alerts**: Automatic highlighting and warning cards for locations with > 150 vehicles.
- **Live Feed**: Polling every 5 seconds to fetch data from `http://localhost:8000/traffic`.
- **Modern UI**: Dark mode, glassmorphism, neon accents, and smooth animations.

## How to Run
1. Ensure your Traffic API is running at `http://localhost:8000/traffic`.
2. Open `index.html` in your browser.
   - If using VS Code, you can use "Live Server".
   - Alternatively, run `npx serve .` in this directory.

## Fallback
If the API is not reachable, the dashboard will automatically use **simulated data** so you can see the UI and charts in action immediately.
