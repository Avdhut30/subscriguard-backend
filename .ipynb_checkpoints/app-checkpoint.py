from flask import Flask, request, jsonify
from flask_cors import CORS  # <-- ADD THIS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # <-- ENABLE CORS

# Load trained churn model
model = joblib.load('backend/model/churn_model.pkl')

# Expected input features
input_features = [
    'Gender', 'Age', 'SubscriptionLength', 'MonthlySpend',
    'TotalUsageTime', 'CustomerSupportCalls',
    'SubscriptionType_Standard', 'SubscriptionType_Premium',
    'PaymentMethod_PayPal', 'PaymentMethod_UPI', 'PaymentMethod_Debit Card'
]



@app.route('/')
def home():
    return "SubscriGuard API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("📥 Received data:", data)

        # Ensure columns are in the exact same order the model expects
        input_df = pd.DataFrame([data])

        # 🔥 Force column order to match training
        input_df = input_df[input_features]

        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

        return jsonify({
            'churn': int(prediction),
            'probability': round(float(probability), 4)
        })
    except Exception as e:
        print("❌ Prediction error:", e)
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    app.run(debug=True)
