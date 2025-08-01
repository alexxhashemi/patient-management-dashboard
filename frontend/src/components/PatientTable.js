import React, { useState, useMemo } from 'react';
import './PatientTable.css';
import API from '../api';

export default function PatientTable({ data, onUpdate }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this patient?');
    if (!confirmDelete) return;

    try {
      await API.deletePatient(id);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Parse dates for sorting if sorting by date_of_birth
      if (sortConfig.key === 'date_of_birth') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        // Normalize strings for case-insensitive sorting
        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅'; // neutral icon
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="patient-table-container">
      <table className="patient-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('first_name')} style={{ cursor: 'pointer' }}>
              Name {getSortIcon('first_name')}
            </th>
            <th onClick={() => requestSort('date_of_birth')} style={{ cursor: 'pointer' }}>
              DOB {getSortIcon('date_of_birth')}
            </th>
            <th onClick={() => requestSort('status')} style={{ cursor: 'pointer' }}>
              Status {getSortIcon('status')}
            </th>
            <th onClick={() => requestSort('address')} style={{ cursor: 'pointer' }}>
              Address {getSortIcon('address')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((p) => (
            <tr key={p.id}>
              <td>{`${p.first_name} ${p.middle_name} ${p.last_name}`}</td>
              <td>{new Date(p.date_of_birth).toLocaleDateString()}</td>
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
