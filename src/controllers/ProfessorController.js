const Professor = require('../models/Professor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoAqui';

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    // Verifica se já existe professor com o email
    const professorExistente = await Professor.findOne({ email });
    if (professorExistente) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria e salva o novo professor
    const novoProfessor = new Professor({
      nome,
      email,
      senhaHash,
    });

    await novoProfessor.save();

    return res.status(201).json({ message: 'Professor cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
};

// Função para login do professor
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Busca professor pelo email
    const professor = await Professor.findOne({ email });
    if (!professor) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Compara senha
    const senhaValida = await bcrypt.compare(senha, professor.senhaHash);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: professor._id, nome: professor.nome, email: professor.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ token, nome: professor.nome, email: professor.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
};
