import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import os

# Create dataset directory if it doesn't exist
os.makedirs('../dataset', exist_ok=True)

print("Generating synthetic dataset...")
np.random.seed(42)

n_samples = 5000

# Features based on requirements
# Gender: 0 for Female, 1 for Male
gender = np.random.choice([0, 1], size=n_samples, p=[0.55, 0.45])

# Age between 1 and 120 (realistic distribution focused on adults)
age = np.random.normal(loc=45, scale=18, size=n_samples).astype(int)
age = np.clip(age, 1, 120)

# Hypertension: 0 or 1
hypertension = np.random.choice([0, 1], size=n_samples, p=[0.85, 0.15])

# Heart Disease: 0 or 1
heart_disease = np.random.choice([0, 1], size=n_samples, p=[0.9, 0.1])

# Smoking History: 0 (never), 1 (former), 2 (current)
smoking_history = np.random.choice([0, 1, 2], size=n_samples, p=[0.6, 0.2, 0.2])

# BMI between 10 and 60
bmi = np.random.normal(loc=27, scale=6, size=n_samples)
bmi = np.clip(bmi, 10, 60)

# HbA1c Level between 3 and 15
hba1c_level = np.random.normal(loc=5.5, scale=1.5, size=n_samples)
hba1c_level = np.clip(hba1c_level, 3, 15)

# Blood Glucose Level between 50 and 400
blood_glucose_level = np.random.normal(loc=120, scale=40, size=n_samples)
blood_glucose_level = np.clip(blood_glucose_level, 50, 400)

# Create DataFrame
df = pd.DataFrame({
    'gender': gender,
    'age': age,
    'hypertension': hypertension,
    'heart_disease': heart_disease,
    'smoking_history': smoking_history,
    'bmi': bmi,
    'hba1c_level': hba1c_level,
    'blood_glucose_level': blood_glucose_level
})

# Generate Target Variable (diabetes: 0 or 1) based on risk factors
# Higher age, bmi, hba1c, and glucose increase the probability
risk_score = (
    (df['age'] / 120) * 1.5 + 
    (df['bmi'] / 60) * 2.0 + 
    (df['hba1c_level'] / 15) * 3.5 + 
    (df['blood_glucose_level'] / 400) * 4.0 + 
    df['hypertension'] * 1.0 + 
    df['heart_disease'] * 1.2
)

# Normalize risk score to 0-1 range roughly, and add some noise
risk_score = risk_score + np.random.normal(0, 0.5, size=n_samples)
threshold = np.percentile(risk_score, 88) # ~12% diabetes prevalence
df['diabetes'] = (risk_score > threshold).astype(int)

# Save to CSV
csv_path = '../dataset/diabetes_prediction_dataset.csv'
df.to_csv(csv_path, index=False)
print(f"Synthetic dataset saved to {csv_path}")

print("Training Machine Learning Model...")
X = df.drop('diabetes', axis=1)
y = df['diabetes']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
model.fit(X_train_scaled, y_train)

accuracy = model.score(X_test_scaled, y_test)
print(f"Model Accuracy on Test Set: {accuracy:.4f}")

# Save the model and scaler
joblib.dump(model, 'model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("model.pkl and scaler.pkl saved successfully.")
