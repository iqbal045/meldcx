const request = require('supertest');
const app = require('../app');
const fs = require('fs');

// i) POST/files
describe('Test POST /files', () => {
  test('should return 201 created', async () => {
    const response = await request(app)
      .post('/files')
      .set('content-type', 'multipart/form-data')
      .attach('file', fs.readFileSync(`${__dirname}/file.png`), {
        filename: 'file.png',
      })
      .expect('Content-Type', /json/)
      .expect(201);
  });
});

// ii) GET/files/:publicKey
describe('Test GET/files/:publicKey', () => {
  test('should return 200', async () => {});
});

// iii) DELETE/files/:privateKey
describe('Test DELETE/files/:privateKey', () => {
  test('should return 200', async () => {});
});
