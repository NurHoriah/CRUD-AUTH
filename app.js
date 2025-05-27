require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
const cors = require('cors'); // ← tambahkan ini
const path = require('path');
const productRoutes = require('./routes/productRoutes');


app.use(cors()); // ← tambahkan ini sebelum routes
app.use('/api', userRoutes);
app.use('/api/products', productRoutes);

// Serve folder public agar file bisa diakses langsung
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));