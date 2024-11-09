import * as THREE from "three";
import { createPlane } from "../../utils/three/createPlane";
import { Updatable } from "../../utils/three/Updatable";
import { LabeledAxesHelper } from "../helpers/LabeledAxesHelper";

interface Props {
  debug?: {
    displayFloor?: boolean;
    displayGrid?: boolean;
    displayAxes?: boolean;
  };
}

abstract class Scene extends THREE.Scene implements Updatable {
  protected constructor({ debug }: Props | undefined = {}) {
    super();

    if (debug?.displayFloor === true) {
      this.createFloor();
    }

    if (debug?.displayGrid === true) {
      this.createGrid();
    }

    if (debug?.displayAxes === true) {
      this.createAxes();
    }
  }

  private createFloor() {
    const plane = createPlane({ size: 20, color: 0xffffff });
    this.add(plane);
  }

  private createGrid() {
    this.add(new THREE.GridHelper(20, 20));
    this.add(new THREE.GridHelper(100, 10));
  }

  private createAxes() {
    this.add(new LabeledAxesHelper());
  }

  public abstract update(timeDelta: number): void;
}

export { Scene };
