import { version as _version } from "../../package.json";

import { RenderingManager } from "../three/rendering";
import { CameraSystemsManager } from "../three/camera";
import { ScenesManager } from "../three/scene";
import { PointerManager } from "../three/pointer";
import { StatsPanel } from "../three/debug";

interface Props {
  canvasElement: HTMLCanvasElement;
  cssRendererElement: HTMLDivElement;
  statsPanelElement: HTMLDivElement;
}

class App3D {
  public get version() {
    return _version;
  }

  public readonly renderingManager: RenderingManager;
  public readonly scenesManager: ScenesManager;
  public readonly cameraSystemsManager: CameraSystemsManager;
  public readonly pointerManager: PointerManager;

  private readonly statsPanel: StatsPanel;

  constructor({ canvasElement, cssRendererElement, statsPanelElement }: Props) {
    const renderingManager = new RenderingManager({
      canvasElement,
      cssRendererElement,
      renderLoopFunction: this.renderLoop,
    });
    const scenesManager = new ScenesManager();
    const cameraSystemsManager = new CameraSystemsManager({ canvasElement });
    const pointerManager = new PointerManager({ canvasElement, cameraSystemsManager, scenesManager });

    this.renderingManager = renderingManager;
    this.scenesManager = scenesManager;
    this.cameraSystemsManager = cameraSystemsManager;
    this.pointerManager = pointerManager;

    this.renderingManager.onCanvasElementSizeChanged.add(({ width, height }) => {
      this.cameraSystemsManager.setSize({ width, height });
    });

    this.statsPanel = new StatsPanel({ renderer: this.renderingManager.renderer, statsPanelElement });
    this.statsPanel.show();
  }

  public dispose() {
    this.renderingManager.dispose();
    this.statsPanel.dispose();
  }

  public renderLoop = (timeDelta: number) => {
    this.scenesManager.update(timeDelta);
    this.cameraSystemsManager.update(timeDelta);
    this.pointerManager.update();

    this.renderingManager.render({
      scene: this.scenesManager.activeScene,
      camera: this.cameraSystemsManager.activeCameraSystem.activeCamera,
    });

    this.statsPanel.update();
  };
}

export { App3D };
