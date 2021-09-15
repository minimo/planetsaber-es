import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export class Mesh {
  constructor() {
    this.data = null;
  }

  //3Dモデル読み込み
  load(fileName) {
    return new Promise(resolve => {
      const loader = new GLTFLoader();
      loader.load(
        fileName,
        gltf => {
          this.data = gltf;
          resolve();
        },
        error => {
          console.log(`gltf load error : ${fileName}`, error);
          resolve();
        }
      );
    });
  }
}
