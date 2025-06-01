require('dotenv').config();
const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRoutes');
const db = require('./config/db');

// Middleware untuk parsing JSON
app.use(express.json());

// Routing API
app.use('/api/users', userRoutes);      // Untuk register, login, dll.
app.use('/api/products', productRoutes); // Untuk produk

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Cek koneksi database
// Jika kamu pakai mysql.createConnection, maka perlu connect
if (typeof db.connect === 'function') {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err.stack);
      return;
    }
    console.log('Connected to the database');
  });
} else {
  console.log('Database connection pool initialized');
}
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});
