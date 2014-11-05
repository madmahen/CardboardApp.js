var CardboardApp = {
  // Camera FOV
  fov: 90,
  // Caemra near crop
  near: 0.01,
  // Caemra far crop
  far: 1000,
  // Touch state
  touching: false,

  /**
   * Call this function first. callback function is called with arguments scene, camera, renderer.
   */
  init: function(containerElement, callback) {
    var app = this;

    var renderer = app.renderer = new THREE.WebGLRenderer({
        antialias: true
      }),
      effect = new THREE.StereoEffect(renderer),
      scene = app.scene = new THREE.Scene(),
      camera = app.camera = new THREE.PerspectiveCamera(app.fov, 1, app.near, app.far);

    containerElement.appendChild(renderer.domElement);

    var clock = new THREE.Clock();

    // Gyro control
    var controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);

    // Basic event handlers
    app.on('touchstart', function(e) {
      app.touching = true;
    }).on('touchend', function(e) {
      app.touching = false;
    }).on('mousedown', function(e) {
      app.touching = true;
    }).on('mouseup', function(e) {
      app.touching = false;
    });

    // callback function is optional
    if (callback) callback(scene, camera, renderer);

    // Windows size change handler
    function resize() {
      var width = window.innerWidth;
      var height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    // Start render loop
    requestAnimationFrame(function loop() {
      requestAnimationFrame(loop);
      camera.updateProjectionMatrix();
      controls.update();
      effect.render(scene, camera);
    });
  },

  /**
   * Utility method to addEventListener for rendering canvas.
   */
  on: function(eventName, callback) {
    this.renderer.domElement.addEventListener(eventName, callback);
    return this;
  }
}