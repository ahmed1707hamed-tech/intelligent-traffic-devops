from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator
import pandas as pd
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prometheus metrics
Instrumentator().instrument(app).expose(app)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "traffic_data.csv")


@app.get("/")
def home():
    return {"message": "Traffic Monitoring API Running"}


@app.get("/traffic")
def get_traffic_data():
    df = pd.read_csv(DATA_PATH)
    return df.to_dict(orient="records")


@app.get("/traffic/congestion")
def get_congestion():
    df = pd.read_csv(DATA_PATH)
    congested = df[df["vehicle_count"] > 150]
    return congested.to_dict(orient="records")