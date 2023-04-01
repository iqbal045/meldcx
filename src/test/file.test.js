require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const fs = require('fs');

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

// init private key and public key
let privateKey = '';
let publicKey = '';

// i) POST/files
describe('Test POST /files', () => {
  test('should return 201 created', async () => {
    const res = await request(app)
      .post('/files')
      .set('Content-Type', `multipart/form-data`)
      .attach('file', `${__dirname}/file.png`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.message).toBe('File upload successfully.');
    expect(res.body.data).toHaveProperty('privateKey');
    expect(res.body.data).toHaveProperty('publicKey');

    this.privateKey = res.body.data.privateKey;
    this.publicKey = res.body.data.publicKey;
  });
});

// ii) GET/files/:publicKey
describe('Test GET/files/:publicKey', () => {
  test('should return 200', async () => {
    const res = await request(app)
      .get(`/files/${this.publicKey}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.message).toBe('File retrieve.');
    expect(res.body.data).toHaveProperty('fileUrl');
    expect(res.body.data).toHaveProperty('mimeType');
  });
});

// iii) DELETE/files/:privateKey
describe('Test DELETE/files/:privateKey', () => {
  test('should return 200', async () => {
    const res = await request(app)
      .delete(`/files/${this.privateKey}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.message).toBe('File deleted successfully.');
  });
});
