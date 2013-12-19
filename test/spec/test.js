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
      TestModel = Backbone.Model.extend({
        useParse: true,
        urlRoot: "/test"
      });
      TestCollection = Backbone.Collection.extend({
        useParse: true,
        url: "/test",
        model: TestModel
      });
    });

    describe('Create', function(){
      beforeEach(function(){
        testObject = new TestModel();
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

    });

    describe('existed data', function(){
      beforeEach(function(done){
        testObject = new TestModel();
        testObject.save({'name': "initial name"}, 
          {success: _.bind(function(){
            done(); }, done)
          }
        );
      });

      describe('READ', function(){
        beforeEach(function(){
          this.nameValue = testObject.get('name');
          this.sameObject = new TestModel({objectId: testObject.id});
        });
        it("should get created data", function(done){
          this.sameObject.fetch({
            success: _.bind(function(sameObject){
              expect(sameObject.get('name')).to.equal(this.nameValue);
              this.done();
            }, {done: done, nameValue: this.nameValue})
          });
        });
      });

      describe('UPDATE', function(){
        beforeEach(function(){
          testObject.set({'name': "changed name"});
        });
        it('should update on parse', function(done){
          testObject.save({}, {
            success: _.bind(function(testObject){
              var sameObject = new TestModel({objectId: testObject.id});
              sameObject.fetch({
                success: _.bind(function(sameObject){
                  expect(sameObject.get('name')).to.equal("changed name");
                  done();
                }, done)}
              );
            }, done)
          });
        });
      });

      describe('DELETE', function(){
        beforeEach(function(){
          this.existedId = testObject.id
        });
        it('should delete', function(done){
          testObject.destroy({
            success: _.bind(function(){
              var sameObject = new TestModel({objectId: this.existedId});
              sameObject.fetch({
                error: _.bind(function(sameObject){
                  this.done();
                }, {done: this.done})
              });
            }, {done: done, existedId: this.existedId})
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
