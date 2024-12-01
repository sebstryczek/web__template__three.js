import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Updatable } from "../utils/interfaces";

const DEFAULT_PERSPECTIVE_CAMERA_PARAMETERS = Object.values({
  fov: 70,
  aspect: 1,
  near: 0.1,
  far: 1000,
});

const DEFAULT_ORTHOGRAPHIC_CAMERA_PARAMETERS = Object.values({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  near: 0.1,
  far: 1000,
});

class CameraSystem implements Updatable {
  private readonly perspectiveCamera: THREE.PerspectiveCamera;
  private readonly orthographicCamera: THREE.OrthographicCamera;

  #activeCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  public get activeCamera() {
    return this.#activeCamera;
  }

  private cameraControls: MapControls | OrbitControls | undefined = undefined;

  constructor({ cameraControls }: { cameraControls: { type: "none" | "map" | "orbit"; eventsObject: HTMLElement } }) {
    this.perspectiveCamera = new THREE.PerspectiveCamera(...DEFAULT_PERSPECTIVE_CAMERA_PARAMETERS);
    this.perspectiveCamera.layers.set(0);
    this.perspectiveCamera.layers.enable(31);

    this.orthographicCamera = new THREE.OrthographicCamera(...DEFAULT_ORTHOGRAPHIC_CAMERA_PARAMETERS);
    this.orthographicCamera.layers.set(0);
    this.orthographicCamera.layers.enable(31);

    this.#activeCamera = this.perspectiveCamera;

    switch (cameraControls.type) {
      case "none": {
        break;
      }
      case "map": {
        const mapControls = new MapControls(this.#activeCamera, cameraControls.eventsObject);
        mapControls.zoomToCursor = true;
        mapControls.enableDamping = true;

        this.cameraControls = mapControls;
        break;
      }
      case "orbit": {
        const orbitControls = new OrbitControls(this.#activeCamera, cameraControls.eventsObject);
        orbitControls.enableDamping = true;

        this.cameraControls = orbitControls;
        break;
      }
    }
  }

  public setMode({ mode }: { mode: "perspective" | "orthographic" }) {
    if (mode === "perspective") {
      this.#activeCamera = this.perspectiveCamera;
    } else {
      this.#activeCamera = this.orthographicCamera;
    }
  }

  public setSize({ width, height }: { width: number; height: number }) {
    this.perspectiveCamera.aspect = width / height;
    this.perspectiveCamera.updateProjectionMatrix();
    // TODO: Update orthographic camera parameters
  }

  public update(timeDelta: number) {
    if (this.cameraControls !== undefined) {
      this.cameraControls.update(timeDelta);
    }
  }
}

export { CameraSystem };
