
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
import { TabViewModule } from 'primeng/tabview';
import { IconModule } from '@visurel/iconify-angular';
import { FoodComponent } from './index/food/food.component';
import { HotelComponent } from './index/hotel/hotel.component';
import { VehicleComponent } from './index/vehicle/vehicle.component';
import { AttractionComponent } from './index/attraction/attraction.component';

const routes: Route[] = [
  { path: '', component: IndexComponent }
];

@NgModule({
  declarations: [AppComponent, IndexComponent, FoodComponent, HotelComponent, VehicleComponent, AttractionComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    FormsModule,
    InputTextModule,
    CarouselModule,
    TabViewModule,
    IconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
