

```
# EV Chatbot Project


This project contains a simple frontend chatbot that calls a FastAPI backend to get EV charging demand predictions.


## Setup (Windows / Linux / Mac)


1. Create a project folder and copy files from this repo.
2. Create and activate a virtual environment (recommended):


```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```


3. Install requirements:


```bash
pip install -r requirements.txt
```


4. (Optional) Create a sample model for testing:


```bash
python model_setup.py
```


This will create `ev_model.pkl`.


5. Start the server (recommended port 8001 to avoid conflicts):


```bash
uvicorn server:app --reload --port 8001
6. Open `frontend/index.html` in your browser (or serve the `frontend` folder via a simple server).


## Notes
- Replace `ev_model.pkl` with your trained model (must support `.predict` on a 2D array with 4 features in the order: charging_point, temperature, humidity, vehicle_count).
- If you change the server port, update `frontend/script.js` fetch URL accordingly.