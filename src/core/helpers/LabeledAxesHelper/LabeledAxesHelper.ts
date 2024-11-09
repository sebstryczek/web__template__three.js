import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";

class LabeledAxesHelper extends THREE.Object3D {
  constructor() {
    super();

    this.createAxesHelper();
    this.traverse(this.moveObjectOutsideRenderOrder);
  }

  /**
   * https://discoverthreejs.com/images/first-steps/coordinate_system.svg
   */
  private createAxesHelper() {
    this.add(this.createAxisHelper({ axis: "x" }));
    this.add(this.createAxisHelper({ axis: "y" }));
    this.add(this.createAxisHelper({ axis: "z" }));
  }

  private createAxisHelper({ axis }: { axis: "x" | "y" | "z" }) {
    const geometry = new LineGeometry();

    const direction = [0, 0, 0];

    switch (axis) {
      case "x": {
        direction[0] = 1;
        break;
      }
      case "y": {
        direction[1] = 1;
        break;
      }
      case "z": {
        direction[2] = 1;
        break;
      }
    }

    geometry.setPositions([0, 0, 0, ...direction]);
    geometry.setColors([...direction, ...direction]);

    const material = new LineMaterial({
      color: 0xffffff,
      linewidth: 5, // in world units with size attenuation, pixels otherwise
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
    });

    const line = new Line2(geometry, material);
    line.computeLineDistances();

    const label = this.createLabel({
      text: axis,
      color: new THREE.Color(...direction),
      position: new THREE.Vector3().fromArray(direction),
    });

    line.add(label);

    return line;
  }

  private createLabel({ text, color, position }: { text: string; color: THREE.Color; position: THREE.Vector3 }) {
    const element = document.createElement("div");
    element.textContent = text;
    element.style.fontFamily = "Arial";
    element.style.color = `#${color.getHexString()}`;
    element.style.backgroundColor = "transparent";

    const label = new CSS2DObject(element);
    label.center.set(0.5, 0.5);
    label.position.copy(position.clone().multiplyScalar(1.25));

    return label;
  }

  private moveObjectOutsideRenderOrder = (object3D: THREE.Object3D) => {
    if (object3D instanceof THREE.Mesh || object3D instanceof THREE.Line) {
      if (object3D.material instanceof THREE.Material) {
        object3D.material.depthTest = false;
      }
    }

    object3D.renderOrder = 1;
  };
}

export { LabeledAxesHelper };
