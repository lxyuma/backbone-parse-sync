/*
 * backbone-parse-sync
 * https://github.com/lxyuma/backbone-parse-sync
 *
 * Copyright (c) 2013 ryuma.tsukano
 * Licensed under the MIT license.
 */

(function(Backbone) {

  var ParseSync = {
    useParse: false,
    parseVersion: 1,
    sync: function(){
      if (this.useParse === true) {
        _.extend(_.last(arguments), {
          url: "https://api.parse.com/" + this.parseVersion + "/classes/" + _.result(this, "url"),
          headers: {
            'X-Parse-Application-Id': window.parseHeaders.ApplicationId,
            'X-Parse-REST-API-Key'  : window.parseHeaders.RESTAPIKey}
        });
      }
      return Backbone.sync.apply(this, arguments);
    },
    parse: function(resp, options) {
      if (this.useParse === true && _.has(resp, "results")){
        return resp.results;
      } else {
        return resp;
      }
    }
  };
  _.extend(Backbone.Model.prototype     , ParseSync, {
    idAttribute: "objectId"
  });
  _.extend(Backbone.Collection.prototype, ParseSync, {
  });
}).call(this, Backbone);
