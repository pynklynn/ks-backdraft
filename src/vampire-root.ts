export class VampireRoot extends HTMLElement {
  static readonly tagName = 'v-root';
}

// declare global {
//   interface HTMLElementTagNameMap {
//     [VampireRoot.tagName]: VampireRoot;
//   }
// }

const style = Object.assign(document.createElement('style'), {
  textContent: `
    v-root,
    v-slot,
    v-slot-assigned-content,
    v-slot-fallback-content {
      display: contents;
    }

    v-slot-assigned-content.v-slot__assigned-content--hidden,
    v-slot-fallback-content.v-slot__fallback-content--hidden {
      display: none;
    }
  `,
  type: 'text/css'
});

document.head.appendChild(style);
customElements.define(VampireRoot.tagName, VampireRoot);
