import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionDialogComponent } from './attraction-dialog/attraction-dialog.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AttractionDialogComponent
  ],
  exports: [
    AttractionDialogComponent
  ]
})
export class AttractionDialogModule {}
