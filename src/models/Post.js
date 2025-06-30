const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  autor: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);