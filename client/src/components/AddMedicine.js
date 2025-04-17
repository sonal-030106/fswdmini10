import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: 'morning',
    timing: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, dosage, timing } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/medicine', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/medicines');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add medicine');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Add New Medicine</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Medicine Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dosage Time</label>
                  <select
                    className="form-control"
                    name="dosage"
                    value={dosage}
                    onChange={onChange}
                    required
                  >
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Timing</label>
                  <input
                    type="text"
                    className="form-control"
                    name="timing"
                    value={timing}
                    onChange={onChange}
                    placeholder="e.g., 8:00 AM"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Add Medicine
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine; 