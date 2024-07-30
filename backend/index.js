import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())

// Routes
import userRoutes from './routes/userRoutes.js';
import tourRoutes from './routes/tourRoutes.js'
import authRoutes from './routes/authRoutes.js'
import reviewsRoutes from './routes/reviewsRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js'

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/tours', tourRoutes);
app.use('/review', reviewsRoutes);
app.use('/booking', bookingRoutes);


// Database Connection

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


app.get('/', (req, res) => {
  res.send("Hello!");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
