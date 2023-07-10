# Backdraft

Backdraft provides slotting functionality to components using the light DOM.

Why use the light DOM?
Until some proposals related to accessibility are implemented as part of the web components spec, there are issues related to accessibility and boundary breaking of the shadow DOM.
Given that, if accessibility needs to be supported in an application (which frankly, the answer should be "always"), then slots are not usable at the moment.

Backdraft is based on Daniel Nagy's work on [Vampire Slots](https://github.com/Boulevard/vampire).

* [Installation](#installation)
* [Examples](#examples)
* [API Documentation](#api-documentation)
* [Browser Support](#browser-Support)
* [Caveats](#caveats)

## Installation

This module is installable through npm.

```
npm install --save @pynklynn/backdraft
```

## Examples

#### Basic Example

This example demonstrates moving content to a nameless slot.

```typescript
import { backdraftify } from '@pynklynn/backdraft';

const div = Object.assign(document.createElement('div'), {
  innerHTML: backdraftify`
    <h4>Example</h4>
    <v-slot></v-slot>
  `
};

const pTag = document.createElement('p');
pTag.innerHTML = 'This is slotted content';
div.appendChild(pTag);
```

The above script will produce the following output.

```html
<div>
  <bd-root>
    <h4>Example</h4>
    <bd-slot>
      <bd-slot-assigned-content>
        <p>This is slotted content</p>
      </bd-slot-assigned-content>
    </bd-slot>
  </bd-root>
</div>
```

#### Example Using LitElement

Slots are most useful when combined with custom elements. This is example shows
how easy it is to use Vampire with LitElement.

```typescript
import { backdraftify } from '@pynklynn/backdraft';// TODO fix import
import { customElement, html, LitElement } from 'lit-element'; // TODO fix lit imports

@customElement('x-example')
export class ExampleElement extends WithSlots(LitElement) {
  protected createRenderRoot(): Element | ShadowRoot {
    const bdroot = document.createElement('bd-root');
    this.prepend(bdroot);
    return bdroot;
  }

  render() {
    return html`
      <h5>Example</h5>
      <bd-slot></bd-slot>
    `;
  }
}
```

Given the following markup.

```html
<x-example>
  <p>This content will be slotted.</p>
<x-example>
```

The above component will produce the following output when rendered.

```html
<x-example>
  <bd-root>
    <h5>Example</h5>
    <bd-slot>
      <bd-slot-assigned-content>
        <p>This content will be slotted.</p>
      </bd-slot-assigned-content>
    </bd-slot>
  </bd-root>
<x-example>
```

<!-- TODO revisit below section -->

#### Simple Todo List App

https://stackblitz.com/edit/typescript-uykxn4

## API Documentation

Backdraft is distributed in ES2022 module format.

### BackdraftRoot

A `BackdraftRoot` is the root node of a DOM subtree.

### BackdraftSlot

A `BackdraftSlot` marks the insertion point of foreign content.

#### Properties

```typescript
BackdraftSlot::name: string = '';
```

A slot may be given a name so that it can be targeted.

#### Methods

```typescript
BackdraftSlot::assignedElements(options?: {flatten?: boolean}): Element[];
```

Returns the elements assigned to this slot. If the `flatten` option is set to
`true` it will return fallback content if, and only if, there is no assigned
content, otherwise it will still return the assigned content.

```typescript
BackdraftSlot::assignedNodes(options?: {flatten?: boolean}): Node[];
```

Returns the nodes assigned to this slot. If the `flatten` option is set to
`true` it will return fallback content if, and only if, there is no assigned
content, otherwise it will still return the assigned content.

**Example**

```html
<div>
  <bd-root>
    <bd-slot></bd-slot>
    <bd-slot name="second-slot"></bd-slot>
  </bd-root>
  <div>This will be moved to the default slot</div>
  <div v-slot="second-slot">This will be moved to the second slot.</div>
</div>
```

#### Events

```typescript
interface ISlotChangeEvent extends CustomEvent {
  readonly type = 'v::slotchange';
  readonly bubbles = true;
}
```

The `v::slotchange` event is fired when the slot's assigned content changes.

**Example**

```typescript
slot.addEventListener('v::slotchange', (event: Event) => {
  console.log(event.target.assignedNodes());
});
```

### BackdraftSlotFallbackContent

Allows fallback content to be assigned to a slot.

**Example**

```html
<bd-slot>
  <bd-slot-fallback-content>
    This will be rendered if no content is assigned to this slot.
  </bd-slot-fallback-content>
</bd-slot>
```

## Browser Support

Evergreen browsers are supported.

## Caveats

* Empty `Text` nodes will be assign to a slot and will prevent fallback content
from being rendered.
* Fallback content cannot contain more slots.
