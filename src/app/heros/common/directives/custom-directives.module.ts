import { NgModule } from '@angular/core';
import { UpperCaseInput } from './upper-case.directive';

@NgModule({
  declarations: [
    UpperCaseInput
  ],
  exports: [ UpperCaseInput ],
  providers: []
})
export class CustomDirectivesModule { }
