import { RenderingManager } from "../rendering";
import { CameraSystemsManager } from "../camera";

interface Props {
  canvas: HTMLCanvasElement;
  renderingManager: RenderingManager;
  cameraSystemsManager: CameraSystemsManager;
}

class EventsManager {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderingManager: RenderingManager;
  private readonly cameraSystemsManager: CameraSystemsManager;

  private resizeObserver: ResizeObserver;

  constructor({ canvas, renderingManager, cameraSystemsManager }: Props) {
    this.canvas = canvas;
    this.renderingManager = renderingManager;
    this.cameraSystemsManager = cameraSystemsManager;

    this.resizeObserver = new ResizeObserver(this.handleOnResize);
    this.resizeObserver.observe(this.canvas);
  }

  dispose() {
    this.resizeObserver.unobserve(this.canvas);
    this.resizeObserver.disconnect();
  }

  private handleOnResize = () => {
    const { width, height } = this.canvas.getBoundingClientRect();

    console.log(width, height);
    this.renderingManager.setSize({ width, height });
    this.cameraSystemsManager.setSize({ width, height });
  };
}

export { EventsManager };
