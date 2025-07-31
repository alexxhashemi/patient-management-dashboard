import React from 'react';
import './PatientTable.css';

export default function PatientTable({ data, onUpdate }) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this patient?');
    if (!confirmDelete) return;

    try {
      await fetch(`/api/patients/${id}`, { method: 'DELETE' });
      onUpdate();
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  return (
    <div className="patient-table-container">
      <table className="patient-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Status</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.first_name} {p.middle_name} {p.last_name}</td>
              <td>{new Date(p.dob).toLocaleDateString()}</td>
              <td>{p.status}</td>
              <td>{p.address}</td>
              <td>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
