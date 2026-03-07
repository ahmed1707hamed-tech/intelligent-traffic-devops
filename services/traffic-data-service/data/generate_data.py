import csv
import random
from datetime import datetime, timedelta

# Locations in the city
locations = [
    "Main Street",
    "Second Ave",
    "Third Road",
    "Central Hub",
    "Bridge Edge",
    "North Square",
    "West Tunnel",
    "East Gate",
    "Airport Road",
    "Industrial Zone"
]

start_date = datetime(2025, 3, 1)
days = 5  # number of days of data

rows = []

for day in range(days):
    for hour in range(24):
        for location in locations:
            
            # Simulate traffic patterns
            base = random.randint(50, 120)

            # Rush hours
            if 7 <= hour <= 9 or 16 <= hour <= 19:
                vehicle_count = base + random.randint(80, 180)
            else:
                vehicle_count = base + random.randint(10, 80)

            rows.append({
                "location": location,
                "time": f"{hour:02d}:00",
                "vehicle_count": vehicle_count
            })

# Save CSV
with open("traffic_data.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["location", "time", "vehicle_count"])
    writer.writeheader()
    writer.writerows(rows)

print(f"Generated {len(rows)} traffic records successfully.")