import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
import os

# Load dataset
df = pd.read_csv('data/raw/WA_Fn-UseC_-Telco-Customer-Churn.csv')

# Drop customer ID column
df.drop('customerID', axis=1, inplace=True)

# Convert 'TotalCharges' to numeric (it has some spaces)
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')

# Fill missing TotalCharges with MonthlyCharges * tenure
df['TotalCharges'].fillna(df['MonthlyCharges'] * df['tenure'], inplace=True)

# Encode target column: Churn (Yes/No) → 1/0
df['Churn'] = df['Churn'].map({'Yes': 1, 'No': 0})

# Binary label encoding for binary categorical columns
binary_cols = ['gender', 'Partner', 'Dependents', 'PhoneService', 'PaperlessBilling']
for col in binary_cols:
    df[col] = df[col].map({'Yes': 1, 'No': 0, 'Male': 1, 'Female': 0})

# Columns to One-Hot Encode
multi_cat_cols = ['MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup',
                  'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies',
                  'Contract', 'PaymentMethod']

df = pd.get_dummies(df, columns=multi_cat_cols, drop_first=True)

# Scale numerical columns
scaler = StandardScaler()
numeric_cols = ['tenure', 'MonthlyCharges', 'TotalCharges']
df[numeric_cols] = scaler.fit_transform(df[numeric_cols])

# Save cleaned dataset
os.makedirs('data/processed', exist_ok=True)
df.to_csv('data/processed/churn_cleaned.csv', index=False)

print("✅ Cleaned data saved to 'data/processed/churn_cleaned.csv'")
