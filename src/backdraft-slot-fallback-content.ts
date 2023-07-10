import { BackdraftSlot, BackdraftSlotEvents } from './backdraft-slot';
import { toggleClass } from './utils';

export enum BackdraftSlotFallbackContentClasses {
  hidden = 'bd-slot__fallback-content--hidden'
}
export class BackdraftSlotFallbackContent extends HTMLElement {
  static readonly tagName = 'bd-slot-fallback-content';

  constructor() {
    super();
    this._onSlotChange = this._onSlotChange.bind(this);
  }

  connectedCallback() {
    let hidden = false;

    if (this.parentElement instanceof BackdraftSlot) {
      hidden = Boolean(this.parentElement.assignedNodes().length);

      this.parentElement
        .addEventListener(BackdraftSlotEvents.SlotChange, this._onSlotChange);
    }

    // toggleClass(this, BackdraftSlotFallbackContent.Classes.Hidden, hidden);
    toggleClass(this, BackdraftSlotFallbackContentClasses.hidden, hidden);
  }

  disconnectedCallback() {
    if (this.parentElement instanceof BackdraftSlot) {
      this.parentElement
        .removeEventListener(BackdraftSlotEvents.SlotChange, this._onSlotChange);
    }
  }

  protected _onSlotChange(event: Event) {
    const slot = event.target as BackdraftSlot;
    const hidden = Boolean(slot.assignedNodes().length);

    // toggleClass(this, BackdraftSlotFallbackContent.Classes.Hidden, hidden);
    toggleClass(this, BackdraftSlotFallbackContentClasses.hidden, hidden);
  }
}

// export namespace BackdraftSlotFallbackContent {
//   export enum Classes {
//     Hidden = 'bd-slot__fallback-content--hidden'
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     [BackdraftSlotFallbackContent.tagName]: BackdraftSlotFallbackContent;
//   }
// }

customElements
  .define(BackdraftSlotFallbackContent.tagName, BackdraftSlotFallbackContent);
