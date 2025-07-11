  const request = require('supertest');
  const app = require('../src/app');
  const mongoose = require('mongoose');
  const Post = require('../src/models/Post');

  beforeAll(async () => {
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb';
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await Post.deleteMany();
  });

  afterAll(async () => {
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

  });