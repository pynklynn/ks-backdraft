import { html, LitElement } from 'lit';
import { vampireTag } from '../src/vampire-tag';
import '../src/index';

const template = document.createElement('template');

template.innerHTML = vampireTag`
  <h2>Inside of the outer component</h2>
  <div>
    <p>Slotted right below this</p>
    <v-slot></v-slot>
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

template2.innerHTML = vampireTag`
  <h3>Inside of the inner component</h3>
  <div>
    <p>Slotted right below this</p>
    <v-slot></v-slot>
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

template3.innerHTML = vampireTag`
  <h4>Inside of the deep component</h4>
  <div>
    <p>Slotted right below this</p>
    <v-slot></v-slot>
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
      <v-slot></v-slot>
    `;
  }
}

customElements.define('lit-ex', LitExample);
