export enum BackdraftSlotAssignedContentClasses {
  hidden = 'bd-slot__assigned-content--hidden'
}

export class BackdraftSlotAssignedContent extends HTMLElement {
  static readonly tagName = 'bd-slot-assigned-content';
}

// export namespace BackdraftSlotAssignedContent {
//   export enum Classes {
//     Hidden = 'bd-slot__assigned-content--hidden'
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     [BackdraftSlotAssignedContent.tagName]: BackdraftSlotAssignedContent;
//   }
// }

customElements
  .define(BackdraftSlotAssignedContent.tagName, BackdraftSlotAssignedContent);
