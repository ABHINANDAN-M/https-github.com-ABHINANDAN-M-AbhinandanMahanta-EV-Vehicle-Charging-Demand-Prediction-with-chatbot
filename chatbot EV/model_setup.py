# model_setup.py
from sklearn.ensemble import RandomForestRegressor
import numpy as np
import pickle


# Create synthetic data (4 features)
X = np.random.rand(500, 4) * [20, 40, 100, 500] # scale features
# synthetic target: some linear-ish combination + noise
y = X[:,0]*0.5 + X[:,1]*0.2 + X[:,2]*0.1 + X[:,3]*0.05 + np.random.randn(500)*2


model = RandomForestRegressor(n_estimators=50, random_state=42)
model.fit(X, y)


with open('ev_model.pkl', 'wb') as f:
pickle.dump(model, f)


print('Created ev_model.pkl (sample model).')