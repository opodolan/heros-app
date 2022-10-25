import { Directive, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appToUpperCase]',
  host: {
    '(input)': 'onInput($event)'
  }
})
export class UpperCaseInput {
  constructor(
    @Self() private ngControl: NgControl
  ) { }

  onInput(event: any) {
    this.ngControl.control?.setValue(event.target.value.toUpperCase());
  }
}
