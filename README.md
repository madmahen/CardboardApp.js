CardboardApp.js
==================

**This project is for Web app. To build native Android app use [CardboardAppTemplate](https://github.com/ejeinc/CardboardAppTemplate).**

Simple three.js cardboard template. See [demo](http://ejeinc.github.io/CardboardApp.js/) with your phone. This demo is based on [Chrome Experiments for Cardboard Example](http://vr.chromeexperiments.com/example.html).

## Template

```JavaScript
var app = new CardboardApp();
var scene = app.scene,
  camera = app.camera,
  renderer = app.renderer;

// Create scene here
...

app.on('update', function(e) {
  var state = e.detail;

  // do something on every frames
  // state.touching is true while user is touching screen
  // state.dt is delta time from previous frame
  ...
});
```
