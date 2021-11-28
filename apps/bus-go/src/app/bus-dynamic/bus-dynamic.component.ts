import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdxService } from '@hexschool-f2e/util';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BusStopEstimateTime, BusStopOfRoute, DirectionEnum, StopStatusEnum } from 'libs/viewmodels';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'hexschool-f2e-bus-dynamic',
  templateUrl: './bus-dynamic.component.html',
  styleUrls: ['./bus-dynamic.component.scss']
})
export class BusDynamicComponent implements OnInit {
  routeName = '';
  routes: BusStopOfRoute[] = [];
  curRoute?: BusStopOfRoute;
  fee = 15;
  stops: BusStopEstimateTime[] = [];
  direction: DirectionEnum = DirectionEnum.去程;
  fetchInterval: any;
  showType = 1;
  @ViewChild('routeList') routeList?: ElementRef;
  @ViewChild('bubbleList') bubbleList?: ElementRef;
  lat = 25.0743691;
  lng = 121.3761359;
  debouncer = new Subject<{ lat: number, lng: number }>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AppService,
    private tdxService: TdxService
  ) {
    this.service.dynamicShowTypeChange.subscribe(res => {
      console.log(res);
      this.showType = res;
    });
    this.debouncer.pipe(debounceTime(500)).subscribe(value => {
      this.lat = value.lat;
      this.lng = value.lng;
    });
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    const routeName = params.route as string;
    if (routeName) {
      this.routeName = routeName;
      this.fetchRoute();
      this.initFetchInterval();
    }
  }

  fetchRoute(): void {
    this.tdxService.searchBusRouteStopByRoute(this.service.city, this.routeName).subscribe(res => {
      this.routes = res.filter(route => route.SubRouteName.Zh_tw === this.routeName);
      this.curRoute = this.routes.find(route => route.Direction === this.direction);
      console.log(this.curRoute);
      if (this.curRoute) {
        this.stops = this.curRoute.Stops.map(stop => {
          return new BusStopEstimateTime(stop.StopUID, stop.StopName.Zh_tw || '', '', this.direction, StopStatusEnum.讀取中, -1, stop.StopPosition.PositionLat || 0, stop.StopPosition.PositionLon || 0, '');
        });
      }
    });
    // this.tdxService.searchDisplayRoute(this.service.city, this.routeName).subscribe(res => {
    //   console.info(res);
    // });
  }

  getDestination(): string {
    if (this.curRoute) {
      return this.curRoute.Stops[this.curRoute.Stops.length - 1].StopName.Zh_tw || '';
    } else {
      return '';
    }
  }

  getDeparture(): string {
    if (this.curRoute) {
      return this.curRoute.Stops[0].StopName.Zh_tw || '';
    } else {
      return '';
    }
  }

  getStatusName(status: StopStatusEnum): string {
    return StopStatusEnum[status];
  }

  getEstimateTime(stop: BusStopEstimateTime): number {
    const minutes = Math.floor(stop.EstimateTime / 60);
    return minutes;
  }

  initFetchInterval(): void {
    this.fetchInterval = setInterval(() => {
      if (!this.service.city || !this.routeName || this.stops.length === 0) {
        return;
      }
      this.tdxService.searchBusEstimateByRoute(this.service.city, this.routeName).subscribe(res => {
        res.forEach(row => {
          const existStop = this.stops.find(stop => stop.Direction === row.Direction && stop.StopUID === row.StopUID);
          if (existStop) {
            existStop.PlateNumb = row.PlateNumb || '';
            existStop.Direction = row.Direction || this.direction;
            existStop.StopStatus = row.StopStatus || StopStatusEnum.正常;
            existStop.EstimateTime = row.EstimateTime || -1;
            existStop.UpdateTime = row.UpdateTime || '';
          }
        });
      });
    }, 5000);
  }

  getBusStopStatusClass(stop: BusStopEstimateTime): string {
    if (stop.StopStatus === StopStatusEnum.未發車) {
      return 'border-1 border-white';
    } else if (stop.StopStatus === StopStatusEnum.正常) {
      if (this.getEstimateTime(stop) <= 1) {
        return 'border-2 border-primary';
      } else if (this.getEstimateTime(stop) < 5) {
        return 'border-1 border-white bg-white';
      } else {
        return 'border-1 border-white';
      }
    } else {
      return 'border-1 border-white';
    }
  }

  onListScroll(event: any): void {
    const element = event.target;
    const scrollTop = element.scrollTop;
    if (this.bubbleList) {
      this.bubbleList.nativeElement.scrollTop = scrollTop;
    }
  }

  onMapChange(event: { lat: number, lng: number }): void {
    this.debouncer.next(event);
  }

  onChangeRouteClick(): void {
    this.direction = this.direction === DirectionEnum.去程 ? DirectionEnum.返程 : DirectionEnum.去程;
    this.curRoute = this.routes[this.direction];
    if (this.curRoute) {
      this.stops = this.curRoute.Stops.map(stop => {
        return new BusStopEstimateTime(stop.StopUID, stop.StopName.Zh_tw || '', '', this.direction, StopStatusEnum.讀取中, -1, stop.StopPosition.PositionLat || 0, stop.StopPosition.PositionLon || 0, '');
      });
    }
  }
}
