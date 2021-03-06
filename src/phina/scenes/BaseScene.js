import {DisplayScene, ObjectEx} from "phina.js";
import {SCREEN} from "@/phina/app/Setting";

/**
 * シーンのベースとなるクラス
 */
export class BaseScene extends DisplayScene {

  constructor(options) {
    super(ObjectEx.$safe.call({}, options, BaseScene.defaults));
  }

  // eslint-disable-next-line no-unused-vars
  update(_app) {}

  static defaults = {
    width: SCREEN.width,
    height: SCREEN.height,
    backgroundColor: 'transparent'
  }
}
