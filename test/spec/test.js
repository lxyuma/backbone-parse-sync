/*global describe, it */

'use strict';
(function () {
  var TestModel;
  var TestCollection;
  var testObject;

  describe('CRUD', function(){
    before(function(){
      window.parseHeaders = {
        ApplicationId: "F28PMYTSoJq3qSVDz4McH5SCjFz9MHJdB9yxYQey",
        RESTAPIKey: "2nwwwGpjez61enwakbI8iCAow2137ZVuCtngQXby"
      }
    });
    beforeEach(function(){
      TestModel = Backbone.Model.extend({
        useParse: true,
        urlRoot: "/test"
      });
      testObject = new TestModel();
      TestCollection = Backbone.Collection.extend({
        useParse: true,
        url: "/test",
        model: TestModel
      });
    });

    describe('Create', function(){
      beforeEach(function(){
        this.nameValue = 'test' + (+new Date());
        testObject.set({'name': this.nameValue});
      });
      it('should create on parse', function(done){
        testObject.once('sync', function(testObject){
          expect(testObject.isNew()).to.be.false;
          done();
        });
        testObject.save()

      });

      describe('UPDATE', function(){
        beforeEach(function(){
          testObject.set({'name': "changed"});
        });
        it('should update on parse', function(done){
          testObject.save({}, {
            success: _.bind(function(testObject){
              var sameObject = new TestModel({objectId: testObject.id});
              sameObject.fetch({
                success: _.bind(function(sameObject){
                  expect(sameObject.get('name')).to.equal("changed");
                  done();
                }, done)}
              );
            }, done)
          });
        });
      });
    });

// LATEST
//      new TestCollection().fetch({
//        data: $.param({"order": "-updatedAt"}),
//        success: onSuccess
//      });


  });
})();
