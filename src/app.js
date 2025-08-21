const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api', postRoutes); 

app.get('/', (req, res) => {
  res.status(200).send({ status: 'OK', message: 'Servidor rodando!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

module.exports = app;