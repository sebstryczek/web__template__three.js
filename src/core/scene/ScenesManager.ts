import { Scene } from "./Scene";
import { Updatable } from "../../utils/three/Updatable";

class ScenesManager implements Updatable {
  #activeScene: Scene | undefined;
  public get activeScene(): Scene {
    if (this.#activeScene === undefined) {
      throw new Error("No active scene found.");
    }

    return this.#activeScene;
  }

  private readonly scenes = new Map<string, Scene>();

  public addScene({ id, scene }: { id: string; scene: Scene }) {
    if (this.scenes.has(id)) {
      throw new Error(`Scene ${id} already exists`);
    }

    this.scenes.set(id, scene);
  }

  public activateScene({ id }: { id: string }) {
    const scene = this.scenes.get(id);

    if (scene === undefined) {
      throw new Error(`Scene ${id} not found.`);
    }

    this.#activeScene = scene;
  }

  public update(timeDelta: number): void {
    this.scenes.forEach((scene) => {
      scene.update(timeDelta);
    });
  }
}

export { ScenesManager };
