import pandas as pd
import numpy as np
import random

# Set seed for reproducibility
random.seed(42)
np.random.seed(42)

# Sample size
num_samples = 1000

# Generating fake data
data = {
    'CustomerID': ['CUST' + str(i).zfill(4) for i in range(1, num_samples + 1)],
    'Gender': np.random.choice(['Male', 'Female'], size=num_samples),
    'Age': np.random.randint(18, 65, size=num_samples),
    'SubscriptionType': np.random.choice(['Basic', 'Standard', 'Premium'], size=num_samples),
    'SubscriptionLength': np.random.randint(1, 36, size=num_samples),
    'MonthlySpend': np.round(np.random.uniform(199, 999, size=num_samples), 2),
    'TotalUsageTime': np.round(np.random.uniform(10, 500, size=num_samples), 2),
    'CustomerSupportCalls': np.random.randint(0, 10, size=num_samples),
    'PaymentMethod': np.random.choice(['Credit Card', 'UPI', 'PayPal', 'Debit Card'], size=num_samples),
    'Churn': np.random.choice([0, 1], size=num_samples, p=[0.75, 0.25])  # 25% churn rate
}

df = pd.DataFrame(data)

# Save to CSV
df.to_csv('data/raw/customer_data.csv', index=False)
print("✅ Sample customer data saved to 'data/raw/customer_data.csv'")
