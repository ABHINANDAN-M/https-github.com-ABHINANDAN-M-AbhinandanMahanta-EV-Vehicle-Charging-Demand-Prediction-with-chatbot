from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

# Path to your model file
MODEL_PATH = "ev_model.pkl"

# Load model safely
try:
    with open(MODEL_PATH, "rb") as f:
        model = joblib.load(f)
except Exception as e:
    print("Error loading model:", e)
    model = None


# Input data model
class EVInput(BaseModel):
    charging_point: float
    temperature: float
    humidity: float
    vehicle_count: float


@app.get("/")
def home():
    return {"message": "EV Prediction API is Running!"}


@app.post("/predict")
def predict(data: EVInput):
    if model is None:
        return {"error": "Model not loaded"}

    X = np.array([
        data.charging_point,
        data.temperature,
        data.humidity,
        data.vehicle_count
    ]).reshape(1, -1)

    prediction = model.predict(X)[0]
    return {"prediction": float(prediction)}
