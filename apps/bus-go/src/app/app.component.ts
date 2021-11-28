import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '@hexschool-f2e/util';
import { AppService } from './app.service';

@Component({
  selector: 'hexschool-f2e-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Bus Go';

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private service: AppService
  ) { }

  ngOnInit(): void {
    const firstOpen = this.cookieService.getCookie('bus_go_first_open');
    const city = this.cookieService.getCookie('bus_go_city');
    if (!firstOpen || firstOpen === 'true' || !city) {
      this.router.navigate(['default-setting']);
    } else {
      this.service.city = city;
    }
  }

  showHeader(): boolean {
    return location.href.indexOf('default-setting') > -1 ? false : true;
  }

  onCitySettingClick(): void {
    this.router.navigate(['default-setting', 'cities']);
  }

  showBack(): boolean {
    const notShowPath = ['default-setting', 'index'];
    let result = true;
    notShowPath.forEach(path => {
      result = location.href.indexOf(path) > -1 ? false : result;
    });
    return result;
  }

  showSetting(): boolean {
    return location.href.indexOf('index') > -1;
  }

  onBackClick(): void {
    window.history.back();
  }

  showMap(): boolean {
    return location.href.indexOf('bus-dynamic') > -1;
  }

  onMapClick(): void{
    this.service.toggleDynamicShowType();
  }
}
