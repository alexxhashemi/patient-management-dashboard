import React, { useState } from 'react';
import './PatientForm.css';

export default function PatientForm({ onCreate }) {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    status: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        onCreate();
        setFormData({
          first_name: '',
          middle_name: '',
          last_name: '',
          dob: '',
          status: '',
          address: '',
        });
      } else {
        alert('Failed to create patient');
      }
    } catch (err) {
      console.error('Error creating patient:', err);
    }
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Add New Patient</h2>
      <div className="form-row">
        <label>First Name</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Middle Name</label>
        <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>Last Name</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Inquiry">Inquiry</option>
          <option value="Onboarding">Onboarding</option>
          <option value="Active">Active</option>
          <option value="Churned">Churned</option>
        </select>
      </div>
      <div className="form-row">
        <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} rows="3" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
