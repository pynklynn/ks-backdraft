function backdraftify(strings: TemplateStringsArray, ..._: unknown[]): string {
  return `<bd-root>${strings.join('')}</bd-root>`;
}

export { backdraftify };
