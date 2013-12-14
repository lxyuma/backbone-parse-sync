this is now developing.

# backbone-parse-sync

Backbone plugin for using parse.com


## Getting Started

### In the browser

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/lxyuma/backbone-parse-sync/master/dist/backbone-parse-sync.min.js
[max]: https://raw.github.com/lxyuma/backbone-parse-sync/master/dist/backbone-parse-sync.js

In your web page:

```html
<script src="dist/backbone-parse-sync.min.js"></script>
<script>
      TestModel = Backbone.Model.extend({
        useParse: true,
        urlRoot: "/test"
      });
      testObject = new TestModel();
      testObject.set({'name': 'test'});
      testObject.save();
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 ryuma.tsukano  
Licensed under the MIT license.
