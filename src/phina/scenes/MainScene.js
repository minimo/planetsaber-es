import {ObjectEx} from "phina.js";
import {BaseScene} from "@/phina/scenes/BaseScene";
import {SCREEN} from "@/phina/app/Setting";
import {ThreeLayer} from "@/phina/extensions/ThreeLayer";
// import * as THREE from "three"
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
  }

  setupThreeLayer() {
    const scene = this.threeLayer.scene;
    const camera = this.threeLayer.camera;

    //3Dモデル読み込み
    const loader = new GLTFLoader();
    let model = null;
    loader.load(
      "./assets/fighter.glb",
      gltf => {
        model = gltf.scene;
        model.scale.set(200.0, 200.0, 200.0);
        scene.add(gltf.scene);
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

  // eslint-disable-next-line no-unused-vars
  update(_app) {}
}
