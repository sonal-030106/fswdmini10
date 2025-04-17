import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import './styles/custom.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/medicines"
            element={
              <PrivateRoute>
                <MedicineList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-medicine"
            element={
              <PrivateRoute>
                <AddMedicine />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/medicines" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 