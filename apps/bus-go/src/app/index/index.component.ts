import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CityArrayData } from 'libs/data';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TdxService } from 'libs/util';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BusNews, NewsCategoryEnum } from 'libs/viewmodels';
import { Router } from '@angular/router';

@Component({
  selector: 'hexschool-f2e-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  newsCity = '';
  newsList: BusNews[] = [];
  showNews = false;
  selectedNews?: BusNews;

  constructor(
    private service: AppService,
    private tdxService: TdxService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initNewsCity();
    this.initNews();
  }

  initNewsCity(): void {
    const exist = CityArrayData.find(item => item.CityEngName === this.service.city);
    if (exist) {
      this.newsCity = exist.CityName;
    }
  }

  initNews(): void {
    this.tdxService.fetchBusNews().subscribe(res => {
      this.newsList = res;
    });
  }

  getCategoryName(category: NewsCategoryEnum): string {
    return NewsCategoryEnum[category];
  }

  onStopClick(): void {
    this.router.navigate(['search-stop']);
  }

  onBusRouteClick(): void {
    this.router.navigate(['search-route']);
  }

  onNewsClick(news: BusNews): void {
    this.selectedNews = news;
    setTimeout(() => {
      this.showNews = true;
    }, 0);
  }
}
