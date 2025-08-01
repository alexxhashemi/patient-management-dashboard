import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export async function fetchPatients() {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
}

export async function addPatient(patientData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/patients`, patientData);
    return response.data;
  } catch (error) {
    console.error("Error adding patient:", error);
    throw error;
  }
}

export async function deletePatient(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/patients/${id}`);
    return response.status;  // usually 204
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
}


const API = {
  addPatient,
  fetchPatients,
  deletePatient,
};

export default API;

