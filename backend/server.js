const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "alihashemi",
  host: "localhost",
  database: "patient_db",
  password: "12345",
  port: 5431,
});


app.get("/patients", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM patients ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ error: err.message });
  }
});


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


app.delete('/patients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM patients WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully', patient: result.rows[0] });
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
