import {ObjectEx} from "phina.js";
import {BaseScene} from "@/phina/scenes/BaseScene";
import {SCREEN} from "@/phina/app/Setting";
import {ThreeLayer} from "@/phina/extensions/ThreeLayer";
import * as THREE from "three"

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

    // 立方体オブジェクトを生成
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(300, 300, 300),
      new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 1.0 })
    );
    cube.position.set(0, -250, 0);
    scene.add(this.cube);

    // カメラカウント用
    this.count = 0;

    // 更新
    this.on("enterframe", function () {
      this.count = (this.count++ === 360) ? 0 : this.count++;
      const x = Math.sin(Math.PI * this.count / 180) * 1000;
      const z = Math.cos(Math.PI * this.count / 180) * 1000;

      camera.position.set(x, 0, z);
      camera.lookAt(0, 0, 0);
    });
  }

  // eslint-disable-next-line no-unused-vars
  update(_app) {}
}
