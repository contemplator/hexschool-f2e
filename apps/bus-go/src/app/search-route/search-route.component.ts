import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TdxService } from '@hexschool-f2e/util';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CityArrayData } from 'libs/data';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BusRoute, StopWithRoute } from 'libs/viewmodels';
import { AppService } from '../app.service';

@Component({
  selector: 'hexschool-f2e-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.scss']
})
export class SearchRouteComponent implements OnInit {
  city = '';
  cityName = '';
  searchKeyword = '';
  routes: BusRoute[] = [];

  constructor(
    private router: Router,
    private service: AppService,
    private tdxService: TdxService
  ) { }

  ngOnInit(): void {
    this.city = this.service.city;
    this.cityName = CityArrayData.find(item => item.CityEngName === this.city)?.CityName || '';
  }

  searchRoute(): void {
    const keyword = this.searchKeyword;
    if (keyword.trim().length === 0) {
      return;
    }
    this.tdxService.searchBusRoute(this.city, keyword).subscribe(res => {
      console.info(res);
      this.routes = res;
      // this.stops = [];
      // res.forEach(route => {
      //   const routeStop = route.Stops.find(stop => stop.StopName.Zh_tw && stop.StopName.Zh_tw.indexOf(keyword) > -1);
      //   if (routeStop) {
      //     const existStop = this.stops.find(stop => stop.StopID === routeStop.StationID);
      //     if (existStop) {
      //       existStop.Routes.push(route.RouteName.Zh_tw || '');
      //     } else {
      //       const newStop = new StopWithRoute(routeStop.StationID || '', routeStop.StopName.Zh_tw ? routeStop.StopName.Zh_tw : '', '', [route.RouteName.Zh_tw || '']);
      //       this.stops.push(newStop);
      //     }
      //   }
      // });
    });
  }

}
