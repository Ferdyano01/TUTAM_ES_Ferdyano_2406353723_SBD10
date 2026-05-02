// 1. Memanggil pustaka utama
const express = require('express');
const { Pool } = require('pg'); 
const cors = require('cors');

const app = express();

// 2. Middleware
app.use(cors()); 
app.use(express.json()); 

// 3. Koneksi ke PostgreSQL Cloud (Neon.tech)
// Menggunakan Connection String yang baru saja Anda dapatkan
const connectionString = "postgresql://neondb_owner:npg_swiBfFLA6j4V@ep-old-sea-ao0pht0u-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Wajib untuk koneksi ke layanan cloud seperti Neon
  }
});

pool.connect()
  .then(() => console.log('✅ BERHASIL Terhubung ke Database PostgreSQL Neon (Cloud)!'))
  .catch((err) => {
    console.error('❌ Gagal terhubung ke Neon:');
    console.error(err.message);
  });

// 4. Membuat Tabel Otomatis
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Sedang Diproses',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createTableQuery)
  .then(() => console.log('✅ Tabel "reports" siap digunakan di Cloud.'))
  .catch(err => console.error("❌ Gagal membuat tabel:", err));


// ==========================================
// 5. JALUR API (ROUTES)
// ==========================================

// Route: Mengambil semua laporan (Read)
app.get('/api/reports', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reports ORDER BY date DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: Membuat laporan baru (Create)
app.post('/api/reports', async (req, res) => {
  try {
    const { title, location, priority } = req.body;
    
    // Generate ID TKT-xxx secara acak
    const id = `TKT-${Math.floor(Math.random() * 900) + 100}`;

    const result = await pool.query(
      'INSERT INTO reports (id, title, location, priority) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, title, location, priority]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: Menghapus laporan (Delete)
app.delete('/api/reports/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM reports WHERE id = $1', [id]);
    res.status(200).json({ message: 'Laporan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 6. Menyalakan Server Backend
// Menggunakan process.env.PORT agar Render bisa mengatur port-nya nanti
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Backend berjalan di port ${PORT}`);
});