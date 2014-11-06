cardboard-template
==================

Simple three.js cardboard template.

## Template

```JavaScript
CardboardApp.init(function(app) {
  // CardboardApp === app

  var scene = app.scene,
    camera = app.camera,
    renderer = app.renderer;

  // Create scene here


  app.on('update', function(e) {
  	var state = e.detail;

  	// do something on every frames
  	// state.touching is true while user is touching screen
  	// state.dt is delta time from previous frame
  });
});
```
