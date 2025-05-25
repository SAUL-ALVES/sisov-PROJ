const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const animalRoutes = require('./routes/animalRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:8080', 'https://sisov.vercel.app'], // URLs permitidas
    methods: ['GET', 'POST']
}));
app.use(bodyParser.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rota raiz (entregar o frontend)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/pages/index.html'));
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/animais', animalRoutes);

// QR Codes
app.use('/qrcodes', express.static(path.join(__dirname, './qrcodes')));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});