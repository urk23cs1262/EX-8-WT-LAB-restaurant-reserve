import React from 'react';

const ReservationList = ({ reservations, onEdit, onDelete, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  if (loading) {
    return (
      <div className="card">
        <h2>Reservations</h2>
        <div className="loading">Loading reservations...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Reservations ({reservations.length})</h2>
      
      {reservations.length === 0 ? (
        <div className="empty-state">
          <h3>No reservations yet</h3>
          <p>Make your first reservation using the form on the left!</p>
        </div>
      ) : (
        <div className="reservation-list">
          {reservations.map(reservation => (
            <div key={reservation._id} className="reservation-item">
              <div className="reservation-header">
                <div className="reservation-name">{reservation.customerName}</div>
                <div className={`reservation-status status-${reservation.status}`}>
                  {reservation.status}
                </div>
              </div>
              
              <div className="reservation-details">
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{reservation.customerEmail}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{reservation.customerPhone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Party Size</span>
                  <span className="detail-value">{reservation.partySize} people</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{formatDate(reservation.reservationDate)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time</span>
                  <span className="detail-value">{formatTime(reservation.reservationTime)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Table</span>
                  <span className="detail-value">#{reservation.tableNumber}</span>
                </div>
              </div>
              
              {reservation.specialRequests && (
                <div style={{ marginBottom: '1rem' }}>
                  <span className="detail-label">Special Requests:</span>
                  <p style={{ marginTop: '0.25rem', color: '#666' }}>
                    {reservation.specialRequests}
                  </p>
                </div>
              )}
              
              <div className="reservation-actions">
                <button 
                  className="btn" 
                  onClick={() => onEdit(reservation)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => onDelete(reservation._id)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;