import * as THREE from "three";

import { FpsStatsModule } from "./FpsStatsModule";
import { MemoryStatsModule } from "./MemoryStatsModule";
import { RendererStatsModule } from "./RendererStatsModule";
import { StatsModule } from "./StatsModule";

const STATS_PANEL_HEIGHT_IN_PIXELS = 48;
const STATS_PANEL_SPACE_IN_PIXELS = 8;

interface Props {
  renderer: THREE.WebGLRenderer;
  statsPanelElement: HTMLDivElement;
}

class StatsPanel {
  private statsPanels: Array<StatsModule> = [];
  private isVisible = true;

  constructor({ renderer, statsPanelElement }: Props) {
    const rendererStats = new RendererStatsModule({ renderer });
    rendererStats.setPosition({ left: STATS_PANEL_SPACE_IN_PIXELS, top: STATS_PANEL_SPACE_IN_PIXELS });
    statsPanelElement.append(rendererStats.element);
    this.statsPanels.push(rendererStats);

    const fpsStats = new FpsStatsModule();
    statsPanelElement.append(fpsStats.element);
    fpsStats.setPosition({
      left: STATS_PANEL_SPACE_IN_PIXELS,
      top: STATS_PANEL_HEIGHT_IN_PIXELS + STATS_PANEL_SPACE_IN_PIXELS * 2,
    });

    const memoryStats = new MemoryStatsModule();
    statsPanelElement.append(memoryStats.element);
    memoryStats.setPosition({
      left: STATS_PANEL_SPACE_IN_PIXELS,
      top: STATS_PANEL_HEIGHT_IN_PIXELS * 2 + STATS_PANEL_SPACE_IN_PIXELS * 3,
    });

    this.statsPanels.push(fpsStats, memoryStats);

    this.hide();
  }

  public dispose(): void {
    this.statsPanels.forEach((statsPanel) => {
      statsPanel.dispose();
    });
  }

  public show(): void {
    this.statsPanels.forEach((statsPanel) => {
      statsPanel.show();
    });
  }

  public hide(): void {
    this.statsPanels.forEach((statsPanel) => {
      statsPanel.hide();
    });
  }

  public toggleVisibility = () => {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }

    this.isVisible = !this.isVisible;
  };

  public update(): void {
    this.statsPanels.forEach((statsPanel) => {
      statsPanel.update();
    });
  }
}

export { StatsPanel };
