# SubscriGuard - Customer Churn Prediction App

SubscriGuard is a full-stack machine learning web application that predicts the likelihood of customer churn for a subscription-based business. It leverages a machine learning model served via a Flask API and a modern React frontend styled with Tailwind CSS.

## Features

- **Customer Input Form**: Collects relevant customer data
- **ML Prediction**: Uses a trained XGBoost model to predict churn
- **Dynamic UI**: Tailwind CSS-based interactive form and results
- **Churn Risk Meter**: Color-coded visual bar for churn probability
- **Prediction History**: Tracks user predictions with timestamps
- **Live Chart**: Shows churn probability over time

## Demo
Live App: [https://subscriguard-frontend.vercel.app](https://subscriguard-frontend.vercel.app)  
Backend API: [https://subscriguard-backend.onrender.com](https://subscriguard-backend.onrender.com)

---

## Tech Stack

### Frontend
- React
- Axios
- Tailwind CSS
- Recharts (for visualizations)

### Backend
- Python
- Flask
- scikit-learn
- XGBoost
- Gunicorn (for deployment)

### Hosting
- Frontend: Vercel
- Backend: Render

---

## Getting Started Locally

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Connect Frontend to Backend
Create a `.env` file inside `/frontend` with:
```
REACT_APP_API_URL=http://127.0.0.1:5000
```
Or use the Render live API URL when deployed.

---

## Screenshots

![Screenshot - Form](./screenshots/form.png)  
![Screenshot - Prediction](./screenshots/prediction-result.png)  
![Screenshot - History](./screenshots/history-chart.png)

---

## License
MIT License

---

## Author
**Avdhut30**  
Built with passion and deployed with precision!

---

## Want to Contribute?
Pull requests are welcome. Feel free to open issues or suggest features.

---

### Show some love!
If you like this project, leave a star on the repo or share it!

