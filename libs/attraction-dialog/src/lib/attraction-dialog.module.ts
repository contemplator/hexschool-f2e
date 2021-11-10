import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionDialogComponent } from './attraction-dialog/attraction-dialog.component';
import { IconModule } from '@visurel/iconify-angular';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, IconModule, BlockUIModule, ButtonModule],
  declarations: [
    AttractionDialogComponent
  ],
  exports: [
    AttractionDialogComponent
  ]
})
export class AttractionDialogModule { }
