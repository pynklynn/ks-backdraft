export enum BackdraftSlotAssignedContentClasses {
  hidden = 'bd-slot__assigned-content--hidden'
}

export class BackdraftSlotAssignedContent extends HTMLElement {
  static readonly tagName = 'bd-slot-assigned-content';
}

customElements
  .define(BackdraftSlotAssignedContent.tagName, BackdraftSlotAssignedContent);
