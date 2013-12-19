# backbone-parse-sync

Backbone plugin for using [parse.com](http://parse.com)

This plugin use parse [Rest API](https://parse.com/docs/rest) (Not use javascript API).

Use for personal application or mock creation or hackason event.

## Getting Started

### before using

1. you must regist parse.com
1. you must create project
1. check your ApplicationId and RestAPIKey in your settings(url may be ```https://parse.com/apps/your-project/edit#app_keys```)

All steps are very easy! Please check [parse.com](http://parse.com/)

### Downloads

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/lxyuma/backbone-parse-sync/master/dist/backbone-parse-sync.min.js
[max]: https://raw.github.com/lxyuma/backbone-parse-sync/master/dist/backbone-parse-sync.js

### usage

First, you must configure applicationId and RestAPIKey(not js api).

So, you can use Parse when write ```useParse:true``` in model or collection.

This is example code.

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

### Query

If you'd like to use parse query, you can add save options.

This plugin does not provide such function. :-)

## License
Copyright (c) 2013 ryuma.tsukano  
Licensed under the MIT license.
