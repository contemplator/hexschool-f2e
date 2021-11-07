
// main module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
// component
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
// primeng
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';

const routes: Route[] = [
  { path: '', component: IndexComponent }
];

@NgModule({
  declarations: [AppComponent, IndexComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    FormsModule,
    InputTextModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
