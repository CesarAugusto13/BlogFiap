  const request = require('supertest');
  const app = require('../src/app');
  const mongoose = require('mongoose');
  const Post = require('../src/models/Post');
  const dotenv = require('dotenv');

  dotenv.config();
  const authToken = process.env.AUTH_SECRET;
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb_test');
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
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          titulo: 'Post de Teste',
          conteudo: 'Conteúdo do post de teste.',
          autor: 'Jest'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.titulo).toBe('Post de Teste');
    });

    it('Deve listar todos os posts', async () => {
      const response = await request(app)
        .get('/api/posts');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('Deve editar um post existente', async () => {
      const post = await Post.create({
        titulo: 'Post Original',
        conteudo: 'Conteúdo original.',
        autor: 'Jest'
      });

      const response = await request(app)
        .put(`/api/posts/${post._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          titulo: 'Post Editado',
          conteudo: 'Conteúdo editado.'
        });

      expect(response.status).toBe(200);
      expect(response.body.titulo).toBe('Post Editado');
    });

  });