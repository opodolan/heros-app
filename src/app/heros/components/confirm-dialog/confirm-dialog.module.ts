import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }
