'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var imagesCtrlStub = {
  index: 'imagesCtrl.index',
  show: 'imagesCtrl.show',
  create: 'imagesCtrl.create',
  update: 'imagesCtrl.update',
  destroy: 'imagesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var imagesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './images.controller': imagesCtrlStub
});

describe('Images API Router:', function() {

  it('should return an express router instance', function() {
    imagesIndex.should.equal(routerStub);
  });

  describe('GET /api/image/', function() {

    it('should route to images.controller.index', function() {
      routerStub.get
        .withArgs('/', 'imagesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/image//:id', function() {

    it('should route to images.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'imagesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/image/', function() {

    it('should route to images.controller.create', function() {
      routerStub.post
        .withArgs('/', 'imagesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/image//:id', function() {

    it('should route to images.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'imagesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/image//:id', function() {

    it('should route to images.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'imagesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/image//:id', function() {

    it('should route to images.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'imagesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
