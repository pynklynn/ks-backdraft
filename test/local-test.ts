import { html, LitElement } from 'lit';
import { backdraftify } from '../src/backdraftify-tag';
import '../src/index';

const template = document.createElement('template');

template.innerHTML = backdraftify`
  <h2>Inside of the outer component</h2>
  <div>
    <p>Slotted right below this</p>
    <bd-slot>
      <bd-slot-fallback-content>
        <p><b>This is fallback for outer.</b></p>
      </bd-slot-fallback-content>
    </bd-slot>
  </div>
`;

class OuterComponent extends HTMLElement {
  connectedCallback() {
    this.renderRoot.appendChild(template.content.cloneNode(true));
  }

  get renderRoot(): HTMLElement {
    return this;
  }
}

customElements.define('outer-component', OuterComponent);

const template2 = document.createElement('template');

template2.innerHTML = backdraftify`
  <h3>Inside of the inner component</h3>
  <div>
    <p>Slotted right below this</p>
    <bd-slot></bd-slot>
  </div>
`;

class InnerComponent extends HTMLElement {
  connectedCallback() {
    this.renderRoot.appendChild(template2.content.cloneNode(true));
  }

  get renderRoot(): HTMLElement {
    return this;
  }
}

customElements.define('inner-component', InnerComponent);

const template3 = document.createElement('template');

template3.innerHTML = backdraftify`
  <h4>Inside of the deep component</h4>
  <div>
    <p>Slotted right below this</p>
    <bd-slot></bd-slot>
  </div>
`;

class DeepComponent extends HTMLElement {
  connectedCallback() {
    this.renderRoot.appendChild(template3.content.cloneNode(true));
  }

  get renderRoot(): HTMLElement {
    return this;
  }
}

customElements.define('deep-component', DeepComponent);


class LitExample extends LitElement {
  // TODO create a decorator for lit
  protected createRenderRoot(): Element | ShadowRoot {
    const vroot = document.createElement('v-root');
    this.prepend(vroot);
    return vroot;
  }

  render() {
    return html`
      <h3>Here is a Lit example</h3>
      <bd-slot></bd-slot>
    `;
  }
}

customElements.define('lit-ex', LitExample);
