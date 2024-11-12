import Stats from "three/examples/jsm/libs/stats.module.js";

import { StatsModule } from "../StatsModule";

class MemoryStatsModule extends StatsModule {
  private stats: Stats;

  constructor() {
    const stats = new Stats();

    super({ element: stats.dom });

    this.stats = stats;
    this.stats.showPanel(2);
  }

  public update() {
    this.stats.update();
  }
}

export { MemoryStatsModule };
