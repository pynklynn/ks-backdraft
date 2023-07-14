export class BackdraftRoot extends HTMLElement {
  static readonly tagName = 'bd-root';
}

const style = Object.assign(document.createElement('style'), {
  textContent: `
    bd-root,
    bd-slot,
    bd-slot-assigned-content,
    bd-slot-fallback-content {
      display: contents;
    }

    bd-slot-assigned-content.bd-slot__assigned-content--hidden,
    bd-slot-fallback-content.bd-slot__fallback-content--hidden {
      display: none;
    }
  `,
  type: 'text/css'
});

document.head.appendChild(style);
customElements.define(BackdraftRoot.tagName, BackdraftRoot);
