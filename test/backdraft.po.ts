import { Selector } from 'testcafe';

export class BackdraftPO {
  static get oneLevel(): Selector {
    return Selector('#backdraft-one-level');
  }

  static get oneLevelSlottedContent(): Selector {
    return Selector('#backdraft-one-level bd-slot bd-slot-assigned-content h5');
  }

  static get oneLevelFallbackContent(): Selector {
    return Selector('#backdraft-one-level bd-slot bd-slot-fallback-content');
  }

  static get oneLevelFallbackOnlyFallbackContent(): Selector {
    return Selector('#backdraft-one-level-fallback bd-slot bd-slot-fallback-content p');
  }

  static get twoLevel(): Selector {
    return Selector('#backdraft-two-level');
  }

  static get twoLevelContent(): Selector {
    return Selector('#backdraft-two-level bd-slot inner-component bd-slot bd-slot-assigned-content h5');
  }

  static get threeLevel(): Selector {
    return Selector('#backdraft-three-level');
  }

  static get threeLevelContent(): Selector {
    return Selector('#backdraft-three-level bd-slot inner-component bd-slot deep-component bd-slot bd-slot-assigned-content h5');
  }

  static get lit(): Selector {
    return Selector('#backdraft-lit');
  }

  static get litContent(): Selector {
    return Selector('#backdraft-lit bd-slot:not([name]) bd-slot-assigned-content h4');
  }

  static get litNamedContent(): Selector {
    return Selector('#backdraft-lit bd-slot[name="test-named-slot"] bd-slot-assigned-content em');
  }

  static get changeEventExample(): Selector {
    return Selector('#backdraft-change-event-example');
  }

  static get changeEventNotice(): Selector {
    return Selector('#backdraft-change-event-notice');
  }
}
