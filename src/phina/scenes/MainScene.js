import {ObjectEx} from "phina.js";
import {BaseScene} from "@/phina/scenes/BaseScene";
import {SCREEN} from "@/phina/app/Setting";
import {ThreeLayer} from "@/phina/extensions/ThreeLayer";
import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

/**
 * メインシーン
 */
export class MainScene extends BaseScene {
  static defaults = {
    width: SCREEN.width,
    height:SCREEN.height,
    backgroundColor: 'black',
    clearColor: 0x000000,
  };

  constructor(options) {
    options = ObjectEx.$safe.call({}, options, MainScene.defaults);
    super(options);

    /**
     * @type {ThreeLayer}
     */
    this.threeLayer = new ThreeLayer(MainScene.defaults).setOrigin(0, 0).addChildTo(this);
    this.setupThreeLayer();
    this.setupWorld();
  }

  setupThreeLayer() {
    const scene = this.threeLayer.scene;
    const camera = this.threeLayer.camera;

    //3Dモデル読み込み
    const loader = new GLTFLoader();
    loader.load(
      "./assets/fighter.glb",
      gltf => {
        const model = gltf.scene;
        model.scale.set(200.0, 200.0, 200.0);
        model.rotation.set(Math.PI / 2, 0, 0);
        scene.add(model);
      },
      error => console.log("gltf load error", error)
    );

    // 更新
    let count = 0;
    this.on("enterframe", function () {
      const x = Math.sin(Math.PI * count / 180) * 1000;
      const z = Math.cos(Math.PI * count / 180) * 1000;

      camera.position.set(x, 0, z);
      camera.lookAt(0, 0, 0);
      count++;
      count %= 360;
    });
  }

  setupWorld() {
    // const scene = this.threeLayer.scene;
    // const camera = this.threeLayer.camera;

    //3Dモデル読み込み
    const loader = new GLTFLoader();
    loader.load(
      "./assets/world_test.glb",
      gltf => {
        const animations = gltf.animations;
        this.animationCamera = gltf.cameras[0];
        if (animations && animations.length) {
          this.cameraAnimationMixer = new THREE.AnimationMixer(gltf.scene);
          for (let i = 0; i < animations.length; i++) {
            let action = this.cameraAnimationMixer.clipAction(animations[i]);
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished = true;
            action.play();
          }
        }
      },
      error => console.log("gltf load error ./assets/world_test.glb", error)
    );
  }

  // eslint-disable-next-line no-unused-vars
  update(_app) {}
}
