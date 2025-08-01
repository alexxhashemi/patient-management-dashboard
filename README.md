# Patient Management Dashboard

This full-stack project includes a React frontend and a Node.js/Express backend connected to a PostgreSQL database for managing patient records.

---

## Available Scripts

In the **frontend** and **backend** directories, you can run the following scripts:

---

## 🖥️ Frontend (`/frontend`)

To start the React app, first navigate to the frontend folder:

```bash
cd frontend
```

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.


---

## 🛠️ Backend (`/backend`)

To start the API server, navigate to the backend folder:

```bash
cd backend
```

### `node server.js`

Starts the Express server.  
By default, it runs on [http://localhost:3001](http://localhost:3001).

### `.env` File

Create a `.env` file in the `backend/` directory to configure your server:

```env
PORT=3001
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/patient_db
```


### SQL Setup

To initialize the database, create the `patients` table in PostgreSQL:

```sql
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  status TEXT,
  address TEXT
);
```

---


## Final Notes

- Start the **backend** server first, then the **frontend**.
- Make sure PostgreSQL is running and credentials are correct.
- Keep both servers running in separate terminals during development.
