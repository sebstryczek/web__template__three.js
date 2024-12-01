import * as THREE from "three";
import { Updatable } from "../../utils/interfaces/Updatable";
import { CameraSystemsManager } from "../../camera";
import { ScenesManager } from "../../scene";
import { Event } from "../../../core/general/entities/Event/Event";

class PointerManager implements Updatable {
  public onPointerEnteredObject3D = new Event<{ object3D: THREE.Object3D }>({ name: "onPointerEnteredObject3D" });
  public onPointerLeftObject3D = new Event<{ object3D: THREE.Object3D }>({ name: "onPointerLeftObject3D" });

  private readonly canvasElement: HTMLCanvasElement;
  private readonly cameraSystemsManager: CameraSystemsManager;
  private readonly scenesManager: ScenesManager;

  private readonly raycaster = new THREE.Raycaster();
  private pointerPosition: THREE.Vector2 | undefined = undefined;
  private pointedObject3D: THREE.Object3D | undefined;

  constructor({
    canvasElement,
    cameraSystemsManager,
    scenesManager,
  }: {
    canvasElement: HTMLCanvasElement;
    cameraSystemsManager: CameraSystemsManager;
    scenesManager: ScenesManager;
  }) {
    this.canvasElement = canvasElement;
    this.cameraSystemsManager = cameraSystemsManager;
    this.scenesManager = scenesManager;

    this.raycaster.layers.set(0);
    this.canvasElement.addEventListener("pointermove", this.handleOnPointerMove);
  }

  public dispose() {
    this.canvasElement.removeEventListener("pointermove", this.handleOnPointerMove);
  }

  public update() {
    if (this.pointerPosition === undefined) {
      return;
    }

    this.raycaster.setFromCamera(this.pointerPosition, this.cameraSystemsManager.activeCameraSystem.activeCamera);

    const intersections = this.raycaster.intersectObjects(this.scenesManager.activeScene.children);
    const pointedObject3D = intersections.length === 0 ? undefined : intersections[0].object;

    if (pointedObject3D !== this.pointedObject3D) {
      if (this.pointedObject3D !== undefined) {
        this.onPointerLeftObject3D.trigger({ object3D: this.pointedObject3D });
      }

      this.pointedObject3D = pointedObject3D;

      if (this.pointedObject3D !== undefined) {
        this.onPointerEnteredObject3D.trigger({ object3D: this.pointedObject3D });
      }
    }
  }

  private handleOnPointerMove = (event: PointerEvent) => {
    if (this.pointerPosition === undefined) {
      this.pointerPosition = new THREE.Vector2();
    }

    const { width, height } = this.canvasElement.getBoundingClientRect();

    const x = (event.offsetX / width) * 2 - 1;
    const y = ((event.offsetY / height) * 2 - 1) * -1;

    this.pointerPosition.set(x, y);
  };
}

export { PointerManager };
