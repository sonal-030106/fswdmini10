import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/custom.css';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/medicine', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMedicines(res.data);
      } catch (err) {
        setError('Failed to fetch medicines');
      }
    };

    fetchMedicines();
  }, []);

  const handleMarkAsTaken = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/medicine/${id}/taken`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMedicines(medicines.map(med => 
        med._id === id ? { ...med, isTaken: true } : med
      ));
    } catch (err) {
      setError('Failed to update medicine status');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/medicine/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMedicines(medicines.filter(med => med._id !== id));
    } catch (err) {
      setError('Failed to delete medicine');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">My Medicines</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/add-medicine')}
        >
          <i className="fas fa-plus me-2"></i>Add New Medicine
        </button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row">
        {medicines.map(medicine => (
          <div key={medicine._id} className="col-md-4 mb-4">
            <div className="card medicine-card h-100">
              <div className="card-body">
                <h5 className="card-title">{medicine.name}</h5>
                <div className="medicine-info mb-4">
                  <p className="mb-2">
                    <i className="fas fa-clock me-2 text-primary"></i>
                    <strong>Dosage:</strong> {medicine.dosage}
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-calendar me-2 text-primary"></i>
                    <strong>Timing:</strong> {medicine.timing}
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-check-circle me-2 text-primary"></i>
                    <span className={`status-badge ${medicine.isTaken ? 'taken' : 'pending'}`}>
                      {medicine.isTaken ? 'Taken' : 'Pending'}
                    </span>
                  </p>
                </div>
                <div className="btn-group w-100">
                  {!medicine.isTaken && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleMarkAsTaken(medicine._id)}
                    >
                      <i className="fas fa-check me-2"></i>
                      Mark as Taken
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(medicine._id)}
                  >
                    <i className="fas fa-trash me-2"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineList; 