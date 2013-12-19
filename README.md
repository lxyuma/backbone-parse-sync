this is now developing.

# backbone-parse-sync

Backbone plugin for using parse.com

This plugin use parse Rest API (not use javascript API).


## Getting Started

### before using

1. you must regist parse.com
1. you must create project
1. check your ApplicationId and RestAPIKey in your settings(url may be ```https://parse.com/apps/your-project/edit#app_keys```)

All steps are very easy! Please check [parse.com](https://parse.com/)

### In the browser

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/lxyuma/backbone-parse-sync/master/dist/backbone-parse-sync.min.js
[max]: https://raw.github.com/lxyuma/backbone-parse-sync/master/dist/backbone-parse-sync.js

In your web page:

```html
<script src="dist/backbone-parse-sync.min.js"></script>
<script>
  // settings
  window.parseHeaders = {
    ApplicationId: "*****************************",
    RESTAPIKey: "*****************************"
  };

  // Model
  TestModel = Backbone.Model.extend({
    useParse: true,
    urlRoot: "/blogs" // this means using parse 'blogs' object
  });
  testObject = new TestModel();
  testObject.set({'name': 'test'});
  testObject.save();

  // Collection
  TestCollection = Backbone.Collection.extend({
    useParse: true,
    url: "/blogs",
    model: TestModel
  });
  new TestCollection().fetch();
</script>
```


## License
Copyright (c) 2013 ryuma.tsukano  
Licensed under the MIT license.
