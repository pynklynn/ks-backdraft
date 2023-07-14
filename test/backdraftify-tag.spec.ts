import { backdraftify } from '../src/backdraftify-tag';

describe('backdraftify tag tests', () => {
  it('should add the bd-root tag to the output', () => {
    const tmpl = backdraftify`<p>I'm slot content</p>`;
    expect(tmpl).toEqual('<bd-root><p>I\'m slot content</p></bd-root>');
  });
});

