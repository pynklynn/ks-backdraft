// eslint-disable-next-line @typescript-eslint/ban-types
function backdraftifyLit<T extends { new (...args: any[]): {} }>(constructor: T, ..._: unknown[]) {
  return class extends constructor {
    createRenderRoot() {
      const bdroot = document.createElement('bd-root');
      (this as unknown as HTMLElement).prepend(bdroot);
      return bdroot;
    }
  };
}

export { backdraftifyLit };
