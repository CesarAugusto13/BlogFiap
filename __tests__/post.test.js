const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Post = require('../src/models/Post');

beforeAll(async () => {
  // Conectar a um banco de dados de teste
  const url = 'mongodb://localhost:27017/blogdb';
  await mongoose.connect(url);
});

afterEach(async () => {
  // Limpar a coleção de posts após cada teste
  await Post.deleteMany();
});

afterAll(async () => {
  // Desconectar do banco
  await mongoose.connection.close();
});

describe('API de Posts', () => {
  it('Deve criar um novo post com sucesso', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        titulo: 'Post de Teste',
        conteudo: 'Conteúdo do post de teste.',
        autor: 'Jest'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.titulo).toBe('Post de Teste');
  });

  // Escreva outros testes aqui...
});