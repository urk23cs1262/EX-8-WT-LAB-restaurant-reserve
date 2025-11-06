import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import { reservationAPI } from './services/api';
import './index.css';

function App() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReservation, setEditingReservation] = useState(null);
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await reservationAPI.getAllReservations();
      setReservations(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch reservations. Please try again.');
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleReservationCreated = () => {
    fetchReservations();
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
  };

  const handleCancelEdit = () => {
    setEditingReservation(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await reservationAPI.deleteReservation(id);
        await fetchReservations();
      } catch (err) {
        setError('Failed to delete reservation. Please try again.');
        console.error('Error deleting reservation:', err);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        {error && <div className="error">{error}</div>}
        
        <div className="main-content">
          <ReservationForm 
            onReservationCreated={handleReservationCreated}
            editingReservation={editingReservation}
            onCancelEdit={handleCancelEdit}
          />
          
          <ReservationList 
            reservations={reservations}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;