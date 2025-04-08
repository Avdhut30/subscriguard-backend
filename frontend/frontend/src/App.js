import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    gender: 1,
    SeniorCitizen: 0,
    Partner: 1,
    Dependents: 0,
    PhoneService: 1,
    PaperlessBilling: 1,
    tenure: 12,
    MonthlyCharges: 70,
    TotalCharges: 840,
    'MultipleLines_No phone service': 0,
    'MultipleLines_Yes': 0,
    'InternetService_Fiber optic': 1,
    'InternetService_No': 0,
    'OnlineSecurity_No internet service': 0,
    'OnlineSecurity_Yes': 0,
    'OnlineBackup_No internet service': 0,
    'OnlineBackup_Yes': 0,
    'DeviceProtection_No internet service': 0,
    'DeviceProtection_Yes': 0,
    'TechSupport_No internet service': 0,
    'TechSupport_Yes': 0,
    'StreamingTV_No internet service': 0,
    'StreamingTV_Yes': 0,
    'StreamingMovies_No internet service': 0,
    'StreamingMovies_Yes': 0,
    'Contract_One year': 0,
    'Contract_Two year': 0,
    'PaymentMethod_Credit card (automatic)': 0,
    'PaymentMethod_Electronic check': 1,
    'PaymentMethod_Mailed check': 0,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData);
      setResult(res.data);
    } catch (err) {
      alert('Prediction failed. Is Flask running?');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          SubscriGuard - Churn Prediction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="gender" placeholder="Gender (1=Male, 0=Female)" value={formData.gender} onChange={handleChange} className="input" />
            <input type="number" name="SeniorCitizen" placeholder="Senior Citizen (1/0)" value={formData.SeniorCitizen} onChange={handleChange} className="input" />
            <input type="number" name="tenure" placeholder="Tenure (months)" value={formData.tenure} onChange={handleChange} className="input" />
            <input type="number" name="MonthlyCharges" placeholder="Monthly Charges" value={formData.MonthlyCharges} onChange={handleChange} className="input" />
            <input type="number" name="TotalCharges" placeholder="Total Charges" value={formData.TotalCharges} onChange={handleChange} className="input" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 transition">
            Predict Churn
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 border rounded-xl bg-indigo-50 text-indigo-800">
            <h3 className="font-semibold text-lg mb-2">Prediction Result:</h3>
            <p><strong>Churn:</strong> {result.churn === 1 ? 'Yes' : 'No'}</p>
            <p><strong>Probability:</strong> {result.probability}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
