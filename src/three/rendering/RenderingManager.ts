import * as THREE from "three";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

import { Updatable } from "../utils/interfaces/Updatable.ts";
import { Event } from "../../core/general/entities/Event/Event.ts";

interface Props {
  canvasElement: HTMLCanvasElement;
  cssRendererElement: HTMLDivElement;
  renderLoopFunction: Updatable["update"];
}

class RenderingManager {
  public readonly onCanvasElementSizeChanged = new Event<{ width: number; height: number }>({
    name: "onCanvasElementSizeChanged",
  });
  private readonly canvasElement: HTMLCanvasElement;
  private readonly resizeObserver: ResizeObserver;

  public readonly renderer: THREE.WebGLRenderer;
  private renderer2D: CSS2DRenderer;

  constructor({ canvasElement, cssRendererElement, renderLoopFunction }: Props) {
    this.canvasElement = canvasElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setAnimationLoop(renderLoopFunction);

    this.renderer2D = new CSS2DRenderer({ element: cssRendererElement });

    this.resizeObserver = new ResizeObserver(this.handleOnResize);
    this.resizeObserver.observe(this.canvasElement);
  }

  public dispose() {
    this.resizeObserver.unobserve(this.canvasElement);
    this.resizeObserver.disconnect();
  }

  public render({ scene, camera }: { scene: THREE.Scene; camera: THREE.Camera }) {
    // Postprocessing here
    this.renderer.render(scene, camera);
    this.renderer2D.render(scene, camera);
  }

  private handleOnResize = () => {
    const { width, height } = this.canvasElement.getBoundingClientRect();

    this.renderer.setSize(width, height, false);
    this.renderer2D.setSize(width, height);
    this.onCanvasElementSizeChanged.trigger({ width, height });
  };
}

export { RenderingManager };
