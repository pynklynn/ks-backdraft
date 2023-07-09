import '../src';

const template = document.createElement('template');

template.innerHTML = `
<v-root>
  <h2>Inside of the outer component</h2>
  <div>
    <p>Slotted right below this</p>
    <v-slot></v-slot>
  </div>
</v-root>
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

template2.innerHTML = `
<v-root>
  <h3>Inside of the inner component</h3>
  <div>
    <p>Slotted right below this</p>
    <v-slot></v-slot>
  </div>
</v-root>
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

template3.innerHTML = `
<v-root>
  <h4>Inside of the deep component</h4>
  <div>
    <p>Slotted right below this</p>
    <v-slot></v-slot>
  </div>
</v-root>
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
