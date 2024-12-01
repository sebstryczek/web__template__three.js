import { CameraSystem } from ".";
import { Updatable } from "../utils/interfaces/Updatable";

class CameraSystemsManager implements Updatable {
  #activeCameraSystem: CameraSystem;
  public get activeCameraSystem() {
    return this.#activeCameraSystem;
  }

  public get mainCameraSystem() {
    const cameraSystem = this.cameraSystems.get("main");
    if (cameraSystem === undefined) {
      throw new Error("Main camera system does not exist");
    }

    return cameraSystem;
  }

  private cameraSystems = new Map<string, CameraSystem>();

  constructor({ canvasElement }: { canvasElement: HTMLCanvasElement }) {
    this.cameraSystems.set(
      "main",
      new CameraSystem({
        cameraControls: {
          type: "map",
          eventsObject: canvasElement,
        },
      }),
    );

    this.#activeCameraSystem = this.mainCameraSystem;
  }

  public setSize({ width, height }: { width: number; height: number }) {
    this.mainCameraSystem.setSize({ width, height });
  }

  public update(timeDelta: number) {
    this.activeCameraSystem.update(timeDelta);
  }
}

export { CameraSystemsManager };
