const getElement = <T extends HTMLElement>(selectors: string): T => {
  const element = document.querySelector<T>(selectors);

  if (element === null) {
    throw new Error(`Element ${selectors} not found.`);
  }

  return element;
};

export { getElement };
