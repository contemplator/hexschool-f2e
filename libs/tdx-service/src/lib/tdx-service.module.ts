import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TdxService } from './tdx.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TdxService
  ],
  providers: [
    TdxService
  ]
})
export class TdxServiceModule {}
