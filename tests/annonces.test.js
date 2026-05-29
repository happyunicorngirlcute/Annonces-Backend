const request = require('supertest');
const app = require('../app');

describe('API Annonces', () => {
  it('GET /routes/annonces/api doit retourner un tableau', async () => {
    const res = await request(app).get('/routes/annonces/api');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
