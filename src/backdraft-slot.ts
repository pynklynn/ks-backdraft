import { BackdraftRoot } from './backdraft-root';
import { BackdraftSlotAssignedContent, BackdraftSlotAssignedContentClasses } from './backdraft-slot-assigned-content';
import { BackdraftSlotFallbackContent } from './backdraft-slot-fallback-content';
import { toggleClass } from './utils';

export enum BackdraftSlotEvents {
  // TODO rename event
  SlotChange = 'v::slotchange'
}

export class BackdraftSlot extends HTMLElement {
  static readonly tagName = 'bd-slot';

  name: string = this.getAttribute('name') || '';

  protected _assignedContent: BackdraftSlotAssignedContent;
  protected _observer = new MutationObserver(() => this._updateAssignedContent());
  protected _vampireRoot: BackdraftRoot | null = null;

  constructor() {
    super();

    this._assignedContent = document.createElement(BackdraftSlotAssignedContent.tagName);
    this._assignedContent.classList.add(BackdraftSlotAssignedContentClasses.hidden);

    const observer = new MutationObserver(() => {
      const hidden = this._assignedContent.childNodes.length === 0;

      toggleClass(this._assignedContent, BackdraftSlotAssignedContentClasses.hidden, hidden);
      this.dispatchEvent(new CustomEvent(BackdraftSlotEvents.SlotChange, {
        bubbles: true
      }));
    });

    observer.observe(this._assignedContent, {childList: true});
  }

  connectedCallback() {
    if (!this._assignedContent.parentElement) {
      this.appendChild(this._assignedContent);
    }

    this._vampireRoot = this._getBackdraftRoot();

    if (!this._vampireRoot) {
      return;
    }

    this._updateAssignedContent();
    this._observer.observe(this._vampireRoot.parentElement!, {childList: true});
  }

  disconnectedCallback() {
    this._observer.disconnect();

    const element = this._vampireRoot && this._vampireRoot.parentElement;
    const fragment = document.createDocumentFragment();

    Array.from(this._assignedContent.childNodes).forEach((child) => {
      fragment.appendChild(child);
    });

    if (element) {
      element.appendChild(fragment);
    }

    this._vampireRoot = null;
  }

  assignedElements(options: {flatten?: boolean} = {}): Element[] {
    const assignedElements = Array.from(this._assignedContent.children);
    const fallbackContent = this.querySelector(BackdraftSlotFallbackContent.tagName);

    return options.flatten && !assignedElements.length
      ? fallbackContent ? Array.from(fallbackContent.children) : []
      : assignedElements;
  }

  assignedNodes(options: {flatten?: boolean} = {}): Node[] {
    const assignedNodes = Array.from(this._assignedContent.childNodes);
    const fallbackContent = this.querySelector(BackdraftSlotFallbackContent.tagName);

    return options.flatten && !assignedNodes.length
      ? fallbackContent ? Array.from(fallbackContent.childNodes) : []
      : assignedNodes;
  }

  protected _getSlotForNode(node: Node): string {
    return node instanceof HTMLElement ? node.getAttribute('bd-slot') || '' : '';
  }

  protected _getBackdraftRoot(): BackdraftRoot | null {
    let parent = this.parentElement;

    while (parent !== null && !(parent instanceof BackdraftRoot)) {
      if (parent instanceof BackdraftSlot) {
        /**
         * There is nothing stopping someone from placing a <bd-slot> in their
         * slotted content. If we encounter a <bd-slot> within a <bd-slot> just
         * ignore it.
         */
        parent = null;
        break;
      }

      parent = parent.parentElement;
    }

    return parent;
  }

  protected _updateAssignedContent() {
    if (!this._vampireRoot || !this._vampireRoot.parentElement) {
      return;
    }

    const assignedContent = Array
      .from(this._vampireRoot.parentElement.childNodes)
      .filter((node) => !(node instanceof BackdraftRoot)
        && this._getSlotForNode(node) === this.name);

    if (assignedContent.length) {
      const fragment = document.createDocumentFragment();

      assignedContent.forEach((node) => {
        fragment.appendChild(node);
      });

      this._assignedContent.appendChild(fragment);
    }
  }
}

// export namespace BackdraftSlot {
//   export enum Events {
//     SlotChange = 'v::slotchange'
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     [BackdraftSlot.tagName]: BackdraftSlot;
//   }
// }

customElements.define(BackdraftSlot.tagName, BackdraftSlot);
