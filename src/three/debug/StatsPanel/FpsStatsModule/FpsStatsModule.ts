import Stats from "three/examples/jsm/libs/stats.module.js";

import { StatsModule } from "../StatsModule";

class FpsStatsModule extends StatsModule {
  private stats: Stats;

  constructor() {
    const stats = new Stats();

    super({ element: stats.dom });

    this.stats = stats;
    this.stats.showPanel(0);
  }

  public update() {
    this.stats.update();
  }
}

export { FpsStatsModule };
