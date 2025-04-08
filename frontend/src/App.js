// Full React Component for App.js with Line Chart Integration
import React, { useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const App = () => {
  const [formData, setFormData] = useState({
    gender: 1,
    SeniorCitizen: 0,
    tenure: 12,
    MonthlyCharges: 70,
    TotalCharges: 840,
    Contract: 'Month-to-month',
    InternetService: 'Fiber optic',
    PaymentMethod: 'Electronic check',
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      gender: Number(formData.gender),
      SeniorCitizen: Number(formData.SeniorCitizen),
      tenure: Number(formData.tenure),
      MonthlyCharges: Number(formData.MonthlyCharges),
      TotalCharges: Number(formData.TotalCharges),
      Partner: 1,
      Dependents: 0,
      PhoneService: 1,
      PaperlessBilling: 1,
      'MultipleLines_No phone service': 0,
      'MultipleLines_Yes': 0,
      'InternetService_Fiber optic': formData.InternetService === 'Fiber optic' ? 1 : 0,
      'InternetService_No': formData.InternetService === 'No' ? 1 : 0,
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
      'Contract_One year': formData.Contract === 'One year' ? 1 : 0,
      'Contract_Two year': formData.Contract === 'Two year' ? 1 : 0,
      'PaymentMethod_Credit card (automatic)': formData.PaymentMethod === 'Credit card (automatic)' ? 1 : 0,
      'PaymentMethod_Electronic check': formData.PaymentMethod === 'Electronic check' ? 1 : 0,
      'PaymentMethod_Mailed check': formData.PaymentMethod === 'Mailed check' ? 1 : 0,
    };

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', payload);
      setResult(res.data);
      const timestamp = new Date().toLocaleString();
      setHistory([...history, { input: { ...formData }, output: res.data, timestamp }]);
    } catch (err) {
      alert('Prediction failed. Is Flask running?');
    }
  };

  const clearHistory = () => setHistory([]);

  const getRiskColor = (prob) => {
    if (prob < 0.4) return 'bg-green-500';
    if (prob < 0.7) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SubscriGuard</h1>
          <p className="text-sm">Customer Churn Prediction</p>
        </div>
      </nav>

      <div className="flex justify-center items-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
            Predict if a Customer Will Churn
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                Gender
                <select name="gender" value={formData.gender} onChange={handleChange} className="block w-full mt-1 border rounded">
                  <option value={1}>Male</option>
                  <option value={0}>Female</option>
                </select>
              </label>
              <label className="block">
                Senior Citizen
                <select name="SeniorCitizen" value={formData.SeniorCitizen} onChange={handleChange} className="block w-full mt-1 border rounded">
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </label>
              <label className="block">
                Tenure
                <input type="range" name="tenure" value={formData.tenure} min={0} max={72} onChange={handleChange} className="w-full" />
                <p>{formData.tenure} months</p>
              </label>
              <label className="block">
                Monthly Charges
                <input type="range" name="MonthlyCharges" value={formData.MonthlyCharges} min={0} max={150} onChange={handleChange} className="w-full" />
                <p>₹{formData.MonthlyCharges}</p>
              </label>
              <label className="block">
                Total Charges
                <input type="range" name="TotalCharges" value={formData.TotalCharges} min={0} max={8000} onChange={handleChange} className="w-full" />
                <p>₹{formData.TotalCharges}</p>
              </label>
              <label className="block">
                Contract
                <select name="Contract" value={formData.Contract} onChange={handleChange} className="block w-full mt-1 border rounded">
                  <option>Month-to-month</option>
                  <option>One year</option>
                  <option>Two year</option>
                </select>
              </label>
              <label className="block">
                Internet Service
                <select name="InternetService" value={formData.InternetService} onChange={handleChange} className="block w-full mt-1 border rounded">
                  <option>DSL</option>
                  <option>Fiber optic</option>
                  <option>No</option>
                </select>
              </label>
              <label className="block">
                Payment Method
                <select name="PaymentMethod" value={formData.PaymentMethod} onChange={handleChange} className="block w-full mt-1 border rounded">
                  <option>Electronic check</option>
                  <option>Credit card (automatic)</option>
                  <option>Mailed check</option>
                </select>
              </label>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
              Predict Churn
            </button>
          </form>

          {result && (
            <div className="mt-6">
              <h3 className="font-bold text-lg">Result</h3>
              <p>Churn: {result.churn === 1 ? 'Yes' : 'No'}</p>
              <p>Probability: {result.probability}</p>
              <div className="bg-gray-200 h-4 rounded mt-2">
                <div className={`h-4 rounded ${getRiskColor(result.probability)}`} style={{ width: `${result.probability * 100}%` }}></div>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Prediction History</h3>
                <button onClick={clearHistory} className="text-sm text-red-500">Clear</button>
              </div>
              <ul className="max-h-60 overflow-y-auto space-y-2">
                {history.map((entry, index) => (
                  <li key={index} className="bg-gray-100 p-3 rounded">
                    <p className="text-xs text-gray-600">{entry.timestamp}</p>
                    <p className="text-sm">Churn: {entry.output.churn === 1 ? 'Yes' : 'No'} | Probability: {entry.output.probability}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Churn Probability Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={history.map((h) => ({ name: h.timestamp, probability: h.output.probability }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide />
                    <YAxis domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip formatter={(v) => `${(v * 100).toFixed(2)}%`} />
                    <Line type="monotone" dataKey="probability" stroke="#4f46e5" strokeWidth={2} dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center text-xs text-gray-500 py-6">
        © 2025 SubscriGuard. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
