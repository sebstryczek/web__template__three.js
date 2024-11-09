import { version as _version } from "../../package.json";

import { RenderingManager } from "./rendering";
import { EventsManager } from "./events";
import { CameraSystemsManager } from "./camera";
import { ScenesManager } from "./scene";

interface Props {
  canvas: HTMLCanvasElement;
  cssRendererElement: HTMLDivElement;
}

class App3D {
  public get version() {
    return _version;
  }

  public readonly scenesManager: ScenesManager;
  public readonly cameraSystemsManager: CameraSystemsManager;

  private eventsManager: EventsManager;
  private renderingManager: RenderingManager;

  constructor({ canvas, cssRendererElement }: Props) {
    const renderingManager = new RenderingManager({ canvas, cssRendererElement, renderLoopFunction: this.renderLoop });
    const scenesManager = new ScenesManager();
    const cameraSystemsManager = new CameraSystemsManager({ canvas });
    const eventsManager = new EventsManager({ canvas, renderingManager, cameraSystemsManager });

    this.renderingManager = renderingManager;
    this.scenesManager = scenesManager;
    this.cameraSystemsManager = cameraSystemsManager;
    this.eventsManager = eventsManager;
  }

  dispose() {
    this.eventsManager.dispose();
  }

  public renderLoop = (timeDelta: number) => {
    this.scenesManager.update(timeDelta);
    this.cameraSystemsManager.update(timeDelta);
    this.renderingManager.render({
      scene: this.scenesManager.activeScene,
      camera: this.cameraSystemsManager.activeCameraSystem.activeCamera,
    });
  };
}

export { App3D };
