var CardboardApp = {
  // Camera FOV
  fov: 90,
  // Caemra near crop
  near: 0.01,
  // Caemra far crop
  far: 1000,

  /**
   * Call this function first. callback function is called with CardboardApp instance to get scene, renderer and camera.
   * callback is optional.
   * You can simply call CardboardApp.init(targetElement) and get CardboardApp.scene, CardboardApp.camera etc.
   */
  init: function(callback) {
    var app = this;

    var renderer = app.renderer = new THREE.WebGLRenderer({
        antialias: true
      }),
      effect = new THREE.StereoEffect(renderer),
      scene = app.scene = new THREE.Scene(),
      camera = app.camera = new THREE.PerspectiveCamera(app.fov, 1, app.near, app.far);

    document.body.appendChild(renderer.domElement);

    var clock = new THREE.Clock();
    var state = new CardboardApp.State();

    // Gyro control
    var controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    // Adjust viewport size
    setTimeout(resize, 1);
    window.addEventListener('resize', resize, false);

    // Basic event handlers
    app.on('touchstart', function(e) {
      state.touching = true;
    }).on('touchend', function(e) {
      state.touching = false;
    }).on('mousedown', function(e) {
      state.touching = true;
    }).on('mouseup', function(e) {
      state.touching = false;
    });

    // callback function is optional
    if (callback) callback(app);

    // Windows size change handler
    function resize() {
      var width = window.innerWidth;
      var height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      effect.setSize(width, height);
    }

    // Start render loop
    requestAnimationFrame(function loop() {
      requestAnimationFrame(loop);

      camera.updateProjectionMatrix();
      controls.update();

      // broadcast update
      state.dt = clock.getDelta();
      app.emit('update', {
        detail: state
      });

      // render scene
      effect.render(scene, camera);
    });
  },

  /**
   * Utility method to addEventListener for rendering canvas.
   */
  on: function(eventName, callback) {
    this.renderer.domElement.addEventListener(eventName, callback);
    return this;
  },

  /**
   * Utility method to removeEventListener for rendering canvas.
   */
  off: function(eventName, callback) {
    this.renderer.domElement.removeEventListener(eventName, callback);
    return this;
  },

  /**
   * Utility method to dispatch CustomEvent for rendering canvas.
   */
  emit: function(eventName, arg) {
    var event = new CustomEvent(eventName, arg);
    this.renderer.domElement.dispatchEvent(event);
    return this;
  },

  /**
   * Holds application state. Passed to 'update' event listener's event.detail property.
   */
  State: function() {
    this.dt = 0;
    this.touching = false;
  },

  /**
   * Utility method to call renderer canvas's requestFullscreen. Please call this on user gesture event handler.
   */
  requestFullscreen: function() {
    var elem = this.renderer.domElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
};
