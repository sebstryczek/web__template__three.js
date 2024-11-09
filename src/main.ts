import { App3D } from "./core/App3D";
import { getElement } from "./utils/browser/getElement";
import { MainScene } from "./scenes/MainScene";
import * as THREE from "three";

const main = () => {
  const canvas = getElement<HTMLCanvasElement>("#app-canvas");
  const cssRendererElement = getElement<HTMLDivElement>("#app-css-renderer");

  const app = new App3D({ canvas, cssRendererElement });
  app.scenesManager.addScene({ id: "main", scene: new MainScene() });
  app.scenesManager.activateScene({ id: "main" });

  app.cameraSystemsManager.activeCameraSystem.activeCamera.position.set(5, 5, 5);
  app.cameraSystemsManager.activeCameraSystem.activeCamera.lookAt(new THREE.Vector3(0, 0, 0));

  console.log("App Version:", app.version);
};

main();
