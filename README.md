# AI Powered Diabetes Prediction System

A modern, responsive, production-ready Prediabetes & Diabetes Risk Prediction Web Application. Built with React (Vite), Tailwind CSS, Framer Motion, and a Flask Python backend running a Scikit-Learn Machine Learning model.

## Features
- **AI Prediction**: Advanced ML algorithms (Random Forest) for precise risk assessment.
- **Instant Analysis**: Real-time processing and immediate results.
- **Data Visualization**: Comprehensive charts (Pie, Bar, Area, Line) for better understanding using Recharts.
- **Medical Suggestions**: Personalized lifestyle and medical recommendations based on risk profile.
- **Responsive Design**: Flawless UI across Desktop, Tablet, and Mobile.

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS v4
- Framer Motion
- React Router DOM
- Axios
- Recharts
- React Hook Form
- React Toastify

### Backend
- Python & Flask
- Scikit-Learn
- Pandas & NumPy
- Joblib

## Folder Structure
```
DiabetesPrediction/
│
├── frontend/             # React Vite Application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── services/     # API integration
│   │   ├── App.jsx       # Routing config
│   │   └── main.jsx
│
├── backend/              # Flask API & ML Model
│   ├── app.py            # Main API routes
│   ├── train_model.py    # Generates synthetic data and trains model
│   ├── utils.py          # Helper functions for suggestions
│   ├── model.pkl         # Trained Scikit-Learn model
│   └── scaler.pkl        # Data scaler
│
└── dataset/
    └── diabetes_prediction_dataset.csv
```

## Installation & Running Instructions

To run this full-stack application, you need to run the **Backend** and **Frontend** simultaneously. 
You will need to open **TWO separate terminal windows** inside VS Code.

### Step 1: Open the Project
Open VS Code, go to `File > Open Folder`, and select the `DiabetesPrediction` folder.

### Step 2: Start the Backend Server (Terminal 1)
Open your first terminal in VS Code (`Terminal > New Terminal`). Run the following commands exactly as shown:

```powershell
# Move into the backend folder
cd backend

# Create a virtual environment (only needed the first time)
python -m venv venv

# Activate the virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies (only needed the first time)
pip install -r requirements.txt

# Start the Flask backend server
python app.py
```
> **Note:** The server will start on `http://127.0.0.1:5000`. Keep this terminal open and running. Do not close it!

### Step 3: Start the Frontend Application (Terminal 2)
Since Terminal 1 is currently occupied by the backend server, you need to **open a second terminal**. In VS Code, click the **`+` (Plus icon)** at the top right of the terminal panel to open a new one.

In this new terminal, run:

```powershell
# Move into the frontend folder
cd frontend

# Install dependencies (only needed the first time)
npm install

# Start the React development server
npm run dev
```
> **Note:** The frontend will start on `http://localhost:5173`. `Ctrl + Click` that link in your terminal to open the application in your browser!

---

## API Documentation
- `GET /health` - Checks if the model is loaded and backend is healthy.
- `POST /predict` - Submits patient features and returns risk probability, percentage, and suggestions.
- `GET /statistics` - Returns summary statistics from the dataset.
- `GET /charts` - Returns aggregated JSON data for frontend visualization charts.

## Deployment Guide
- **Frontend**: Can be easily deployed to Vercel, Netlify, or GitHub Pages. Run `npm run build` to generate the production build.
- **Backend**: Can be deployed to Render, Heroku, or AWS Elastic Beanstalk using Gunicorn (`pip install gunicorn` and `gunicorn app:app`).

## Future Enhancements
- Integration with an actual medical database.
- PDF Report generation for predictions.
- User Authentication (JWT based).
- Batch CSV upload for multiple predictions.


