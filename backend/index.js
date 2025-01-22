const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const predictionRoutes = require('./routes/predictions');
const predictionMLRoutes = require('./routes/predictionML');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Seguridad
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/predict', predictionMLRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
