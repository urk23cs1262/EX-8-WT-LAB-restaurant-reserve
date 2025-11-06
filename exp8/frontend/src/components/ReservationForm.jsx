import React, { useState } from 'react';
import { reservationAPI } from '../services/api';

const ReservationForm = ({ onReservationCreated, editingReservation, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    partySize: 2,
    reservationDate: '',
    reservationTime: '18:00',
    specialRequests: '',
    tableNumber: 1
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Set form data when editing
  React.useEffect(() => {
    if (editingReservation) {
      const date = new Date(editingReservation.reservationDate);
      const formattedDate = date.toISOString().split('T')[0];
      
      setFormData({
        customerName: editingReservation.customerName,
        customerEmail: editingReservation.customerEmail,
        customerPhone: editingReservation.customerPhone,
        partySize: editingReservation.partySize,
        reservationDate: formattedDate,
        reservationTime: editingReservation.reservationTime,
        specialRequests: editingReservation.specialRequests,
        tableNumber: editingReservation.tableNumber
      });
    }
  }, [editingReservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingReservation) {
        await reservationAPI.updateReservation(editingReservation._id, formData);
        setSuccess('Reservation updated successfully!');
        onCancelEdit();
      } else {
        await reservationAPI.createReservation(formData);
        setSuccess('Reservation created successfully!');
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          partySize: 2,
          reservationDate: '',
          reservationTime: '18:00',
          specialRequests: '',
          tableNumber: 1
        });
      }
      
      onReservationCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      partySize: 2,
      reservationDate: '',
      reservationTime: '18:00',
      specialRequests: '',
      tableNumber: 1
    });
    onCancelEdit();
  };

  return (
    <div className="card">
      <h2>{editingReservation ? 'Edit Reservation' : 'Make a Reservation'}</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Full Name *</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerEmail">Email *</label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerPhone">Phone Number *</label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="partySize">Party Size *</label>
          <select
            id="partySize"
            name="partySize"
            value={formData.partySize}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
              <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reservationDate">Date *</label>
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservationTime">Time *</label>
          <select
            id="reservationTime"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleChange}
            required
          >
            <option value="17:00">5:00 PM</option>
            <option value="17:30">5:30 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="18:30">6:30 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="19:30">7:30 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="20:30">8:30 PM</option>
            <option value="21:00">9:00 PM</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tableNumber">Table Number *</label>
          <select
            id="tableNumber"
            name="tableNumber"
            value={formData.tableNumber}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(table => (
              <option key={table} value={table}>Table {table}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            placeholder="Any special requirements or preferences..."
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Processing...' : (editingReservation ? 'Update Reservation' : 'Book Table')}
          </button>
          {editingReservation && (
            <button type="button" className="btn btn-danger" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;