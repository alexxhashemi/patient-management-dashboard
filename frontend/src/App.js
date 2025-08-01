import React, { useEffect, useState } from 'react';
import { fetchPatients, addPatient } from './api';
import PatientForm from './components/PatientForm';
import PatientTable from './components/PatientTable';
import './App.css';

function App() {
  const [patients, setPatients] = useState([]);

  const loadPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (error) {
      console.error("Failed to load patients:", error);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div className="container">
      <h1 className="header">Patient Management Dashboard</h1>
      <PatientForm onCreate={loadPatients} />
      <PatientTable data={patients} onUpdate={loadPatients} />
    </div>
  );
}

export default App;
