import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DefaultSettingComponent } from './default-setting/default-setting.component';
import { OptionComponent } from './default-setting/option/option.component';
import { CitisComponent } from './default-setting/citis/citis.component';

import { CookieService, TdxService } from '../../../../libs/util';
import { UiModule } from '../../../../libs/ui';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchStopComponent } from './search-stop/search-stop.component';
import { SearchRouteComponent } from './search-route/search-route.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, DefaultSettingComponent, OptionComponent, CitisComponent, IndexComponent, SearchStopComponent, SearchRouteComponent],
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
      { path: 'search-route', component: SearchRouteComponent }
    ], { initialNavigation: 'enabledBlocking' }),
    ToastModule,
    HttpClientModule,
    FormsModule,
    UiModule
  ],
  providers: [
    CookieService,
    MessageService,
    TdxService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
