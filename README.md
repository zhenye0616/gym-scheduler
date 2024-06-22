# Gym Scheduler App

This is a simple website designed for a gym that allows users to reserve spaces, rent equipment, and manage their membership. The frontend is built with React, and the backend is built with Python, Flask, and Sqlite.



## Local Development

To run the app, Python and Node.js must be installed.

1. Clone the repository

```bash
git clone https://github.com/zhenye0616/gym-scheduler.git
cd gym-scheduler
```

2. Install the dependencies

```bash
cd backend
pip install -r requirements.txt

cd ../frontend
npm install
```

3. Seed database

```bash
cd backend
python3 db_seed.py
```

4. Start the backend server

```bash
cd backend
python3 app.py
```

5. Start the frontend server

```bash
cd frontend
npm run dev
```

Ensure there is a `.env` file inside of `/frontend` with the following content:

```
VITE_BACKEND_URL=http://localhost:5000
```
