'use strict';

var app = require('../..');
var request = require('supertest');

var newAsset;

describe('Asset API:', function() {

  describe('GET /api/assets', function() {
    var assets;

    beforeEach(function(done) {
      request(app)
        .get('/api/assets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(assets).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/assets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/assets')
        .send({
          name: 'New Asset',
          info: 'This is the brand new asset!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newAsset = res.body;
          done();
        });
    });

    it('should respond with the newly created asset', function() {
      expect(newAsset.name).to.equal('New Asset');
      expect(newAsset.info).to.equal('This is the brand new asset!!!');
    });

  });

  describe('GET /api/assets/:id', function() {
    var asset;

    beforeEach(function(done) {
      request(app)
        .get('/api/assets/' + newAsset._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          asset = res.body;
          done();
        });
    });

    afterEach(function() {
      asset = {};
    });

    it('should respond with the requested asset', function() {
      expect(asset.name).to.equal('New Asset');
      expect(asset.info).to.equal('This is the brand new asset!!!');
    });

  });

  describe('PUT /api/assets/:id', function() {
    var updatedAsset

    beforeEach(function(done) {
      request(app)
        .put('/api/assets/' + newAsset._id)
        .send({
          name: 'Updated Asset',
          info: 'This is the updated asset!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAsset = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAsset = {};
    });

    it('should respond with the updated asset', function() {
      expect(updatedAsset.name).to.equal('Updated Asset');
      expect(updatedAsset.info).to.equal('This is the updated asset!!!');
    });

  });

  describe('DELETE /api/assets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/assets/' + newAsset._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when asset does not exist', function(done) {
      request(app)
        .delete('/api/assets/' + newAsset._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
