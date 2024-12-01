import * as THREE from "three";

import { StatsModule } from "../StatsModule";

class RendererStatsModule extends StatsModule {
  private renderer: THREE.WebGLRenderer;

  constructor({ renderer }: { renderer: THREE.WebGLRenderer }) {
    super({ element: document.createElement("div") });

    this.renderer = renderer;
    this.setupElement();
  }

  private setupElement = () => {
    this.element.style.position = "absolute";
    this.element.style.top = "0px";
    this.element.style.left = "0px";
    this.element.style.background = "black";
    this.element.style.color = "white";
    this.element.style.fontFamily = " Arial";
    this.element.style.fontSize = "0.8rem";
    this.element.style.height = "48px";
    this.element.style.lineHeight = "48px";
    this.element.style.paddingLeft = "16px";
    this.element.style.paddingRight = "16px";
  };

  public update() {
    this.element.innerHTML = `POINTS: ${this.renderer.info.render.points.toLocaleString("pl-PL")} | LINES: ${this.renderer.info.render.lines.toLocaleString("pl-PL")} | TRIANGLES: ${this.renderer.info.render.triangles.toLocaleString("pl-PL")}`;
  }
}

export { RendererStatsModule };
