import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem, ToastMsg, SeverityEnum } from '../../../../../../libs/viewmodels';
import { CityArrayData } from '../../../../../../libs/data';
import { MessageService } from 'primeng/api';
import { AppService } from '../../app.service';
import { CookieService } from '@hexschool-f2e/util';

@Component({
  selector: 'hexschool-f2e-citis',
  templateUrl: './citis.component.html',
  styleUrls: ['./citis.component.scss']
})
export class CitisComponent implements OnInit {
  cities: SelectItem[] = [];
  selectedCity = '';

  constructor(
    private router: Router,
    private msgService: MessageService,
    private service: AppService,
    private cookieService: CookieService
  ) {
    this.selectedCity = this.service.city;
  }

  ngOnInit(): void {
    this.initCities();
  }

  initCities(): void {
    this.cities = CityArrayData.map(item => new SelectItem(item.CityName, item.CityEngName));
  }

  onCityClick(city: SelectItem): void {
    this.selectedCity = city.value;
  }

  onSendClick(): void {
    if (!this.selectedCity) {
      this.msgService.add(new ToastMsg(SeverityEnum.warn, '動作失敗', '請選擇縣市'));
      return;
    }

    this.cookieService.setCookie('bus_go_first_open', 'false');
    this.cookieService.setCookie('bus_go_city', this.selectedCity);
    this.service.city = this.selectedCity;
    this.router.navigate(['index']);
  }

}
