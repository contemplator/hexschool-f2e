import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DefaultSettingComponent } from './default-setting/default-setting.component';
import { OptionComponent } from './default-setting/option/option.component';
import { CitisComponent } from './default-setting/citis/citis.component';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CookieService, TdxService } from '../../../../libs/util';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UiModule } from '../../../../libs/ui';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchStopComponent } from './search-stop/search-stop.component';
import { SearchRouteComponent } from './search-route/search-route.component';
import { FormsModule } from '@angular/forms';
import { BusDynamicComponent } from './bus-dynamic/bus-dynamic.component';
import { HeaderComponent } from './header/header.component';
import { CurrencyPipe } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { AgmCoreModule } from '@agm/core';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [AppComponent, DefaultSettingComponent, OptionComponent, CitisComponent, IndexComponent, SearchStopComponent, SearchRouteComponent, BusDynamicComponent, HeaderComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'default-setting', children: [
          { path: '', redirectTo: 'option', pathMatch: 'full' },
          { path: 'option', component: OptionComponent },
          { path: 'cities', component: CitisComponent },
        ]
      },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },
      { path: 'search-stop', component: SearchStopComponent },
      { path: 'search-route', component: SearchRouteComponent },
      { path: 'bus-dynamic/:route', component: BusDynamicComponent },
      { path: 'bus-dynamic', component: BusDynamicComponent },
    ], { initialNavigation: 'enabledBlocking', useHash: true }),
    ToastModule,
    HttpClientModule,
    FormsModule,
    UiModule,
    SidebarModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABCnBx0dgze3XWV51Ejp42sKWQjo64pco'
    }),
    DialogModule
  ],
  providers: [
    CookieService,
    MessageService,
    TdxService,
    CurrencyPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
