# Number Classification API

## Overview
The **Number Classification API** is a FastAPI-based service that classifies a given integer and returns its mathematical properties along with a fun fact.

### Features
- Determines whether a number is **prime**, **perfect**, **Armstrong**, or **even/odd**.
- Computes the **sum of digits**.
- Returns a **fun fact** about the number.
- Returns responses in **JSON format**.
- CORS-enabled for cross-origin requests.

## Technology Stack
- **Backend:** Python, FastAPI
- **Server:** Uvicorn
- **Deployment:** AWS EC2 (Ubuntu)

## API Documentation
### Base URL
```
http://<your-server-ip>:8000
```

### **1. Classify a Number**
#### Endpoint
```
GET /api/classify-number?number=<integer>
```
#### Parameters
| Name     | Type    | Required | Description |
|----------|--------|----------|-------------|
| number   | int    | Yes      | The integer to classify |

#### Response (200 OK)
```json
{
    "number": 28,
    "is_prime": false,
    "is_perfect": true,
    "properties": ["perfect", "even"],
    "digit_sum": 10,
    "fun_fact": "28 is a perfect number because its divisors (1, 2, 4, 7, 14) sum to 28."
}
```

#### Response (400 Bad Request)
```json
{
    "number": "abc",
    "error": true
}
```

## Installation & Setup
### Prerequisites
- Python 3.8+
- Git

### Steps
#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/number-classification-api.git
cd number-classification-api
```

#### 2️⃣ Create a Virtual Environment & Install Dependencies
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### 3️⃣ Run the API Locally
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API will be available at:
```
http://127.0.0.1:8000
```

## Deployment on AWS EC2
### **1. Setup an Ubuntu Server on EC2**
- Launch an **EC2 t2.micro instance**.
- SSH into the instance:
  ```bash
  ssh -i your-key.pem ubuntu@your-server-ip
  ```

### **2. Install Dependencies**
```bash
sudo apt update && sudo apt install python3-pip -y
pip3 install fastapi uvicorn
```

### **3. Deploy the API**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The API will now be accessible at:
```
http://your-server-ip:8000
```

### **4. Enable Firewall (if needed)**
```bash
sudo ufw allow 8000/tcp
```

## Troubleshooting
### **1. ModuleNotFoundError: No module named 'app'**
- Ensure you're running the command from the root directory where `app` is located.
- Check that `app` exists in the project structure.
- Activate your virtual environment before running the application:
  ```bash
  source venv/bin/activate
  ```

### **2. Address already in use**
- Kill the process using port 8000:
  ```bash
  sudo lsof -t -i:8000 | xargs sudo kill -9
  ```

### **3. CORS Issues**
- Ensure that FastAPI is configured to handle CORS properly in `main.py`:
  ```python
  from fastapi.middleware.cors import CORSMiddleware
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```

### **4. Permission Denied on EC2**
- Use `sudo` when necessary:
  ```bash
  sudo uvicorn app.main:app --host 0.0.0.0 --port 8000
  ```
- Check file permissions with:
  ```bash
  ls -lah
  ```

## Contributing
Feel free to fork this repository and submit pull requests.

## License
MIT License


