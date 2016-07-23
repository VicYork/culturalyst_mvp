'use strict';

var app = require('../..');
import request from "supertest";

var newImages;

describe('Images API:', function () {

  describe('GET /api/image/', function () {
    var imagess;

    beforeEach(function (done) {
      request(app)
        .get('/api/image/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          imagess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function () {
      imagess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/image/', function () {
    beforeEach(function (done) {
      request(app)
        .post('/api/image/')
        .send({
          name: 'New Images',
          info: 'This is the brand new images!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newImages = res.body;
          done();
        });
    });

    it('should respond with the newly created images', function () {
      newImages.name.should.equal('New Images');
      newImages.info.should.equal('This is the brand new images!!!');
    });

  });

  describe('GET /api/image//:id', function () {
    var images;

    beforeEach(function (done) {
      request(app)
        .get('/api/image//' + newImages._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          images = res.body;
          done();
        });
    });

    afterEach(function () {
      images = {};
    });

    it('should respond with the requested images', function () {
      images.name.should.equal('New Images');
      images.info.should.equal('This is the brand new images!!!');
    });

  });

  describe('PUT /api/image//:id', function () {
    var updatedImages;

    beforeEach(function (done) {
      request(app)
        .put('/api/image//' + newImages._id)
        .send({
          name: 'Updated Images',
          info: 'This is the updated images!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          updatedImages = res.body;
          done();
        });
    });

    afterEach(function () {
      updatedImages = {};
    });

    it('should respond with the updated images', function () {
      updatedImages.name.should.equal('Updated Images');
      updatedImages.info.should.equal('This is the updated images!!!');
    });

  });

  describe('DELETE /api/image//:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      request(app)
        .delete('/api/image//' + newImages._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when images does not exist', function (done) {
      request(app)
        .delete('/api/image//' + newImages._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
