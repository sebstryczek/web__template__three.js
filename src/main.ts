import { App3D } from "./core/App3D";
import { getElement } from "./utils/browser/getElement";
import { MainScene } from "./scenes/MainScene";
import * as THREE from "three";
import { isMesh } from "./utils/three/isMesh.ts";

const main = () => {
  const canvasElement = getElement<HTMLCanvasElement>("#app-canvas");
  const cssRendererElement = getElement<HTMLDivElement>("#app-css-renderer");
  const statsPanelElement = getElement<HTMLDivElement>("#app-stats-panel");

  const app = new App3D({ canvasElement, cssRendererElement, statsPanelElement });
  app.scenesManager.addScene({ id: "main", scene: new MainScene() });
  app.scenesManager.activateScene({ id: "main" });

  app.cameraSystemsManager.activeCameraSystem.activeCamera.position.set(5, 5, 5);
  app.cameraSystemsManager.activeCameraSystem.activeCamera.lookAt(new THREE.Vector3(0, 0, 0));

  app.pointerManager.onPointerEnteredObject3D.add(({ object3D }) => {
    if (isMesh(object3D) === true) {
      const material = Array.isArray(object3D.material) ? object3D.material[0] : object3D.material;
      if (material instanceof THREE.MeshBasicMaterial) {
        material.userData.color = material.color.clone();
        material.color.setRGB(0, 1, 0);
      }
    }
  });
  app.pointerManager.onPointerLeftObject3D.add(({ object3D }) => {
    if (isMesh(object3D) === true) {
      const material = Array.isArray(object3D.material) ? object3D.material[0] : object3D.material;
      if (material instanceof THREE.MeshBasicMaterial) {
        const originalColor =
          "color" in material.userData && material.userData.color instanceof THREE.Color
            ? material.userData.color
            : material.color;

        material.color = originalColor.clone();
      }
    }
  });

  console.log("App Version:", app.version);
};

main();
