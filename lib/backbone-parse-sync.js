/*
 * backbone-parse-sync
 * https://github.com/ryuma/backbone-parse-sync
 *
 * Copyright (c) 2013 ryuma.tsukano
 * Licensed under the MIT license.
 */

(function(Backbone) {

  var ParseSync = {
    useParse: false,
    sync: function(){
      if (this.useParse === true) {
        _.extend(_.last(arguments), {
          url: "https://api.parse.com/1/classes/" + _.result(this, "url"),
          headers: {
            'X-Parse-Application-Id': window.parseHeaders.ApplicationId,
            'X-Parse-REST-API-Key'  : window.parseHeaders.RESTAPIKey}
        });
      }
      return Backbone.sync.apply(this, arguments);
    }
  };
  _.extend(Backbone.Model.prototype     , ParseSync);
  _.extend(Backbone.Collection.prototype, ParseSync, {
    parse: function(resp, options) {
      if (this.useParse === true){
        return resp.results;
      } else {
        return resp;
      }
    }
  });
}).call(this, Backbone);
