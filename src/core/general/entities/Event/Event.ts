const CONFIG = {
  logTriggers: false,
};

class Event<T = void> {
  private readonly name: string;
  private actions: Array<(arg: T) => void>;

  constructor({ name }: { name: string }) {
    this.name = name;
    this.actions = [];
  }

  add(action: (arg: T) => void) {
    this.actions.push(action);
  }

  trigger(arg: T) {
    if (CONFIG.logTriggers === true) {
      console.info(`Triggering event: ${this.name}`);
    }

    this.actions.forEach((action) => {
      action(arg);
    });
  }

  clear() {
    this.actions = [];
  }
}

export { Event };
