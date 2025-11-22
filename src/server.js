require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error.ctrl');

const app = express();

// ✅ CORS con credenciales y origen específico
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: '5mb' }));

// ✅ Rutas
app.use('/api', require('./routes'));
// app.use('/api/games', require('./routes/game'));
// app.use('/api/resenas', require('./routes/resenas'));

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// ✅ Conexión y arranque del servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Servidor iniciado en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('❌ No se pudo inicializar la aplicación:', err);
    process.exit(1);
  });
