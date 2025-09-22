const request = require('supertest');
const app = require('../src/app');
const Post = require('../src/models/Post');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

const authToken = process.env.TEST_AUTH_TOKEN;

beforeEach(async () => {
  await Post.deleteMany();
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
    await Post.create({ titulo: 'Post 1', conteudo: 'Conteúdo 1', autor: 'Jest' });

    const response = await request(app).get('/api/posts');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].titulo).toBe('Post 1');
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

  it('Deve deletar um post existente com sucesso', async () => {
    const post = await Post.create({
      titulo: 'Post a ser Deletado',
      conteudo: 'Este conteúdo será removido.',
      autor: 'Jest'
    });

    const response = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);

    const postNoBanco = await Post.findById(post._id);
    expect(postNoBanco).toBeNull();
  });

  it('Não deve permitir deletar um post sem um token de autorização', async () => {
    const post = await Post.create({
      titulo: 'Post Protegido',
      conteudo: 'Este conteúdo está seguro.',
      autor: 'Jest'
    });

    const response = await request(app)
      .delete(`/api/posts/${post._id}`);

    expect(response.status).toBe(401);
  });
});
