const pool = require('./db');

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conectado com sucesso:', res.rows[0]);
  } catch (err) {
    console.error('Erro ao conectar:', err);
  } finally {
    
  }
}

testConnection();

