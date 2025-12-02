const Professor = require('../models/Professor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoAqui';

// =========================
// 1) Registrar professor
// =========================
exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    const professorExistente = await Professor.findOne({ email });
    if (professorExistente) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

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

// =========================
// 2) Login do professor
// =========================
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const professor = await Professor.findOne({ email });
    if (!professor) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, professor.senhaHash);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: professor._id, nome: professor.nome, email: professor.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.json({ token, nome: professor.nome, email: professor.email });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
};

// =========================
// 3) Listagem de professores (paginado)
// =========================
exports.list = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Professor.find({}, { senhaHash: 0 }).skip(skip).limit(limit).lean(),
      Professor.countDocuments(),
    ]);

    return res.json({
      data: items,
      total,
      page,
      limit,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar professores.' });
  }
};

// =========================
// 4) Buscar professor por ID
// =========================
exports.getById = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id, { senhaHash: 0 }).lean();

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }

    return res.json(professor);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar professor.' });
  }
};

// =========================
// 5) Atualizar professor
// =========================
exports.update = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const update = { nome, email };

    if (senha) {
      update.senhaHash = await bcrypt.hash(senha, 10);
    }

    const professorAtualizado = await Professor.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    ).select('-senhaHash');

    if (!professorAtualizado) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }

    return res.json(professorAtualizado);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar professor.' });
  }
};

// =========================
// 6) Remover professor
// =========================
exports.remove = async (req, res) => {
  try {
    const professor = await Professor.findByIdAndDelete(req.params.id);

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }

    return res.json({ message: 'Professor removido.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir professor.' });
  }
};
