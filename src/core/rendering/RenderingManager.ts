import * as THREE from "three";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

import { Updatable } from "../../utils/three/Updatable";

interface Props {
  canvas: HTMLCanvasElement;
  cssRendererElement: HTMLDivElement;
  renderLoopFunction: Updatable["update"];
}

class RenderingManager {
  private renderer: THREE.WebGLRenderer;
  private renderer2D: CSS2DRenderer;

  constructor({ canvas, cssRendererElement, renderLoopFunction }: Props) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setAnimationLoop(renderLoopFunction);

    this.renderer2D = new CSS2DRenderer({ element: cssRendererElement });
  }

  public setSize({ width, height }: { width: number; height: number }) {
    this.renderer.setSize(width, height, false);
    this.renderer2D.setSize(width, height);
  }

  public render({ scene, camera }: { scene: THREE.Scene; camera: THREE.Camera }) {
    // Postprocessing here
    this.renderer.render(scene, camera);
    this.renderer2D.render(scene, camera);
  }
}

export { RenderingManager };
