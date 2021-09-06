import {Layer, ObjectEx} from "phina.js";
import * as THREE from "three"

export class ThreeLayer extends Layer {
  static defaults = {
    width: 640,
    height: 480,
    clearColor: 0xf0f0f0,
  };
  constructor(options) {
    options = ObjectEx.$safe.call({}, options, ThreeLayer.defaults);
    super(options);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, options.width / options.height, 1, 10000);
    this.camera.position.z = 1000;

    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(1, 1, 1).normalize();
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(options.clearColor);
    this.renderer.setSize(options.width, options.height);
    this.domElement = this.renderer.domElement;

    this.on('enterframe', () => this.renderer.render(this.scene, this.camera));
  }

  // eslint-disable-next-line no-unused-vars
  update(_app) {}
}
