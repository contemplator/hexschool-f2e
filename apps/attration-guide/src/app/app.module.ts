import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Route } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Route[] = [
  { path: '', component: IndexComponent }
];

@NgModule({
  declarations: [AppComponent, IndexComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
