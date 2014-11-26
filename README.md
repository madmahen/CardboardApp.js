simple-cardboard-template
==================

Simple three.js cardboard template. See [demo](http://ejeinc.github.io/cardboard-template/) with your phone. This demo is based on [Chrome Experiments for Cardboard Example](http://vr.chromeexperiments.com/example.html).

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

## Build for Android app

You can create Android app with [cca](https://github.com/MobileChromeApps/mobile-chrome-apps) tool.

```bash
cca create MyCardboard --link-to=/path/to/thisRepository
cd MyCardboard
cca run
```

### Prefered configuration

Add `<preference name="Fullscreen" value="true" />` to `config.xml`.

```XML
<?xml version='1.0' encoding='utf-8' ?>
<widget ...>
  ...
  <preference name="Fullscreen" value="true" />
</widget>
```

Add `android:screenOrientation="landscape"` attribute to `platforms/android/AndroidManifest.xml`'s `<activity>` element.
This file is not exist until you run `cca run` or `cca prepare`. Please run this command first.

```XML
<?xml version='1.0' encoding='utf-8' ?>
<manifest android:hardwareAccelerated="true" android:versionCode="1" android:versionName="0.0.1" package="com.eje_c.cardboardmaze" xmlns:android="http://schemas.android.com/apk/res/android">
  ...
  <application ...>
    <activity ...
      android:screenOrientation="landscape">
      ...
    </activity>
  </application>
</manifest>
```
