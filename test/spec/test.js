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
      it('should create on parse', function(done){
        testObject.set({'name': 'test'});
        testObject.save();

        new TestCollection().fetch({
          data: $.param({"order": "-updatedAt"}),
          success: function(collection){
            window.parseHeaders.a = collection;
            expect(collection.last().get('name')).to.equal('test');
            done();
          }
        });
      });
    });
  });
})();
