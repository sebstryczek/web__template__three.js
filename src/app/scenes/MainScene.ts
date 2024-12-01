import { Scene } from "../../three/scene";
import * as THREE from "three";

class MainScene extends Scene {
  constructor() {
    super({
      debug: {
        displayFloor: true,
        displayGrid: true,
        displayAxes: true,
      },
    });

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const cube = new THREE.Mesh(geometry, material);
    this.add(cube);
  }

  public override update() {
    return;
  }
}

export { MainScene };
