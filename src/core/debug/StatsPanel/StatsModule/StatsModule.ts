abstract class StatsModule {
  #element: HTMLDivElement;
  public get element() {
    return this.#element;
  }

  protected constructor({ element }: { element: HTMLDivElement }) {
    this.#element = element;
    this.element.style.position = "absolute";
  }

  public dispose() {
    this.#element.remove();
  }

  public setPosition({ left, top }: { left: number; top: number }) {
    this.element.style.left = `${left.toString()}px`;
    this.element.style.top = `${top.toString()}px`;
  }

  public show() {
    this.element.style.display = "block";
  }

  public hide() {
    this.element.style.display = "none";
  }

  public abstract update(): void;
}

export { StatsModule };
