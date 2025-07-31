// server.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL connection setup - update user/password/db as needed
const pool = new Pool({
  user: "alihashemi",       // your DB username
  host: "localhost",
  database: "patient_db",   // your DB name
  password: "12345",        // your DB password
  port: 5431,               // default Postgres port
});

// GET /patients - fetch all patients
app.get("/patients", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM patients ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /patients - add a new patient
app.post("/patients", async (req, res) => {
  const { first_name, middle_name, last_name, date_of_birth, status, address } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO patients (first_name, middle_name, last_name, date_of_birth, status, address)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, middle_name, last_name, date_of_birth, status, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding patient:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
