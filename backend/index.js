const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient
} = require('./queries/patients');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/api/patients', getPatients);
app.post('/api/patients', createPatient);
app.put('/api/patients/:id', updatePatient);
app.delete('/api/patients/:id', deletePatient);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
