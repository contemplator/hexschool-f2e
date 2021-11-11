
// main module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// component
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { FoodComponent } from './index/food/food.component';
import { HotelComponent } from './index/hotel/hotel.component';
import { VehicleComponent } from './index/vehicle/vehicle.component';
import { AttractionComponent } from './index/attraction/attraction.component';
// primeng
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { IconModule } from '@visurel/iconify-angular';
// customer module
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AttractionDialogModule } from '../../../../libs/attraction-dialog/src/lib/attraction-dialog.module';
import { AttractionInfoComponent } from './attraction-info/attraction-info.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';
import { BusInfoComponent } from './bus-info/bus-info.component';

const routes: Route[] = [
  { path: '', component: IndexComponent },
  { path: 'attraction-info/:id', component: AttractionInfoComponent },
  { path: 'attraction-info', component: AttractionInfoComponent },
  { path: 'restaurant-info/:id', component: RestaurantInfoComponent },
  { path: 'restaurant-info', component: RestaurantInfoComponent },
  { path: 'hotel-info/:id', component: RestaurantInfoComponent },
  { path: 'hotel-info', component: RestaurantInfoComponent }
];

@NgModule({
  declarations: [AppComponent, IndexComponent, FoodComponent, HotelComponent, VehicleComponent, AttractionComponent, AttractionInfoComponent, RestaurantInfoComponent, HotelInfoComponent, BusInfoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    FormsModule,
    InputTextModule,
    CarouselModule,
    TabViewModule,
    IconModule,
    DropdownModule,
    HttpClientModule,
    AttractionDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
