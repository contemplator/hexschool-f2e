import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UiModule } from '../../../../libs/ui/src/index';
// import { TdxServiceModule } from '../../../../libs/tdx-service/src/index';
import { IconModule } from '@visurel/iconify-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TdxService } from '../../../../libs/util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchMapComponent } from './search-map/search-map.component';
import { IndexComponent } from './index/index.component';
import { AgmCoreModule } from '@agm/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DecimalPipe } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction

@NgModule({
  declarations: [AppComponent, SearchMapComponent, IndexComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'search-map/:lat/:lng', component: SearchMapComponent },
      { path: 'search-map', component: SearchMapComponent }
    ], { initialNavigation: 'enabledBlocking' }),
    UiModule,
    IconModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABCnBx0dgze3XWV51Ejp42sKWQjo64pco'
    }),
    AgmDirectionModule,
    ToastModule,
    TabViewModule
  ],
  providers: [
    TdxService,
    MessageService,
    DecimalPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
