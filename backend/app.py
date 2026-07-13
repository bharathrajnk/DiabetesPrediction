from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os
from utils import get_suggestions

app = Flask(__name__)
CORS(app)

# Load model and scaler globally
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
scaler_path = os.path.join(os.path.dirname(__file__), 'scaler.pkl')
dataset_path = os.path.join(os.path.dirname(__file__), '..', 'dataset', 'diabetes_prediction_dataset.csv')

try:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
except Exception as e:
    model = None
    scaler = None
    print(f"Warning: Could not load model or scaler. Ensure train_model.py is run. Error: {e}")

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Diabetes Prediction API is running!"})

@app.route('/health', methods=['GET'])
def health():
    status = "healthy" if model and scaler else "model_missing"
    return jsonify({"status": status})

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not scaler:
        return jsonify({"error": "Model not loaded. Please contact administrator."}), 500
        
    try:
        data = request.json
        
        # Extract features
        features = {
            'gender': float(data.get('gender', 0)),
            'age': float(data.get('age', 0)),
            'hypertension': float(data.get('hypertension', 0)),
            'heart_disease': float(data.get('heart_disease', 0)),
            'smoking_history': float(data.get('smoking_history', 0)),
            'bmi': float(data.get('bmi', 0)),
            'hba1c_level': float(data.get('hba1c_level', 0)),
            'blood_glucose_level': float(data.get('blood_glucose_level', 0))
        }
        
        df = pd.DataFrame([features])
        df_scaled = scaler.transform(df)
        
        # Prediction
        prediction = model.predict(df_scaled)[0]
        probability = model.predict_proba(df_scaled)[0][1] # Probability of class 1 (diabetes)
        
        risk_percentage = int(probability * 100)
        confidence_score = f"{int(max(model.predict_proba(df_scaled)[0]) * 100)}%"
        
        prediction_text = "High Risk" if prediction == 1 else "Low Risk"
        
        # Get suggestions
        suggestions = get_suggestions(
            risk_percentage, 
            features['bmi'], 
            features['hba1c_level'], 
            features['blood_glucose_level']
        )
        
        return jsonify({
            "prediction": prediction_text,
            "probability": round(probability, 2),
            "confidence": confidence_score,
            "risk": f"{risk_percentage}%",
            "suggestions": suggestions
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/statistics', methods=['GET'])
def get_statistics():
    try:
        if not os.path.exists(dataset_path):
            return jsonify({"error": "Dataset not found for statistics."}), 404
            
        df = pd.read_csv(dataset_path)
        stats = {
            "average_bmi": round(df['bmi'].mean(), 1),
            "average_age": round(df['age'].mean(), 1),
            "average_glucose": round(df['blood_glucose_level'].mean(), 1),
            "positive_cases": int(df['diabetes'].sum()),
            "negative_cases": int(len(df) - df['diabetes'].sum())
        }
        return jsonify(stats)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/charts', methods=['GET'])
def get_charts_data():
    try:
        if not os.path.exists(dataset_path):
            return jsonify({"error": "Dataset not found for charts."}), 404
            
        df = pd.read_csv(dataset_path)
        
        # Prepare data for various charts
        # 1. Age distribution (bins)
        age_bins = [0, 20, 30, 40, 50, 60, 70, 80, 120]
        labels = ['0-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '80+']
        df['age_group'] = pd.cut(df['age'], bins=age_bins, labels=labels, right=False)
        age_dist = df['age_group'].value_counts().sort_index().to_dict()
        age_chart = [{"name": str(k), "count": int(v)} for k, v in age_dist.items()]
        
        # 2. Glucose vs Diabetes
        glucose_positive = df[df['diabetes'] == 1]['blood_glucose_level'].mean()
        glucose_negative = df[df['diabetes'] == 0]['blood_glucose_level'].mean()
        glucose_chart = [
            {"name": "Low Risk", "glucose": round(glucose_negative, 1)},
            {"name": "High Risk", "glucose": round(glucose_positive, 1)}
        ]
        
        # 3. BMI vs Diabetes
        bmi_positive = df[df['diabetes'] == 1]['bmi'].mean()
        bmi_negative = df[df['diabetes'] == 0]['bmi'].mean()
        bmi_chart = [
            {"name": "Low Risk", "bmi": round(bmi_negative, 1)},
            {"name": "High Risk", "bmi": round(bmi_positive, 1)}
        ]
        
        # 4. Gender distribution
        gender_dist = df['gender'].value_counts().to_dict()
        gender_chart = [
            {"name": "Female", "value": int(gender_dist.get(0, 0))},
            {"name": "Male", "value": int(gender_dist.get(1, 0))}
        ]

        return jsonify({
            "ageDistribution": age_chart,
            "glucoseComparison": glucose_chart,
            "bmiComparison": bmi_chart,
            "genderDistribution": gender_chart
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
