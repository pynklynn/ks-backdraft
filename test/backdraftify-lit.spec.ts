import { backdraftifyLit } from '../src/backdraftify-lit';

describe('backdraftify lit tests', () => {
  it('should add the createRenderRoot method that returns a bd-root tag', () => {
    @backdraftifyLit
    class TestClass {
      prepend = jest.fn();
    }

    const cmp = new TestClass();
    // @ts-ignore
    expect(cmp.createRenderRoot().tagName.toString().toLowerCase()).toEqual('bd-root');
    expect(cmp.prepend).toHaveBeenCalled();
  });
});
