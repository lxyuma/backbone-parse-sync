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

        describe("fetch", function(){
            beforeEach(function(done){
                this.nameList = ["name1", "name2", "name3"];
                var tests = _.map(this.nameList,function(name){
                    return new TestModel({name: name});
                });
                $.when(tests[0].save(), tests[1].save(), tests[2].save()).done(done());

            });
            it('should get all data', function(done){
                var testCollection = new TestCollection();
                testCollection.once('sync', 
                    _.bind(function(testCollection){
                        var testCollectionNameList = _.pluck(testCollection.toJSON(), "name");
                        _.each(this.nameList, function(name){
                            expect(_.contains(testCollectionNameList, name)).to.be.true;
                        });
                        done();
                    }, {done: done, nameList: this.nameList})
                );
                testCollection.fetch({
                    data: $.param({"order": "-updatedAt"})
                });
            });
        });

    });
})();
