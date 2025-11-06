import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import reservationRoutes from './routes/reservations.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration - Allow all origins for development
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/reservations', reservationRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Restaurant Reservation API is running!' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API available at: http://localhost:${PORT}/api`);
});