const request = require('supertest');
const { expect } = require('chai');
const app = require('../index'); // Assure-toi que le chemin vers `index.js` est correct

describe('API Tests for Articles and Comments', function () {
  
  it('GET /articles should return list of articles', function (done) {
    request(app)
      .get('/articles')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('POST /articles should create a new article', function (done) {
    request(app)
      .post('/articles')
      .send({
        title: 'New Test Article',
        content: 'Content of the new test article',
        author: 'Tester'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title', 'New Test Article');
        expect(res.body).to.have.property('author', 'Tester');
        done();
      });
  });

  it('GET /articles/:articleId should return a specific article', function (done) {
    const articleId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'; // Utilise un ID existant
    request(app)
      .get(`/articles/${articleId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id', articleId);
        done();
      });
  });

  it('GET /articles/:articleId/comments should return comments for an article', function (done) {
    const articleId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'; // Utilise un ID existant
    request(app)
      .get(`/articles/${articleId}/comments`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('POST /articles/:articleId/comments should add a new comment', function (done) {
    const articleId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'; // Utilise un ID existant
    request(app)
      .post(`/articles/${articleId}/comments`)
      .send({
        content: 'This is a test comment',
        author: 'Test Commenter'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('content', 'This is a test comment');
        done();
      });
  });

});
