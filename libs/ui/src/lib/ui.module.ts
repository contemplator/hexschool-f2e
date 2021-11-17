import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule
  ],
  declarations: [
    SearchInputComponent
  ],
  exports: [
    SearchInputComponent
  ],
})
export class UiModule { }
