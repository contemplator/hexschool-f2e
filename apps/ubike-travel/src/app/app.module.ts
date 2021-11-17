import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiModule } from '../../../../libs/ui/src/index';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    UiModule,
    IconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
