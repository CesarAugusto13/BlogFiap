const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ProfessorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senhaHash: { type: String, required: true },
});

ProfessorSchema.methods.comparePassword = function(senha) {
  return bcrypt.compare(senha, this.senhaHash);
};
module.exports = mongoose.model('Professor', ProfessorSchema)