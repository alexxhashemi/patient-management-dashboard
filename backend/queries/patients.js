const pool = require('../db');

exports.getPatients = async (req, res) => {
  const result = await pool.query('SELECT * FROM patients ORDER BY created_at DESC');
  res.json(result.rows);
};

exports.createPatient = async (req, res) => {
  const { first_name, middle_name, last_name, dob, status, address } = req.body;
  const result = await pool.query(
    `INSERT INTO patients (first_name, middle_name, last_name, dob, status, address)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [first_name, middle_name, last_name, dob, status, address]
  );
  res.json(result.rows[0]);
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { first_name, middle_name, last_name, dob, status, address } = req.body;
  const result = await pool.query(
    `UPDATE patients SET first_name=$1, middle_name=$2, last_name=$3,
     dob=$4, status=$5, address=$6 WHERE id=$7 RETURNING *`,
    [first_name, middle_name, last_name, dob, status, address, id]
  );
  res.json(result.rows[0]);
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM patients WHERE id=$1', [id]);
  res.sendStatus(204);
};
