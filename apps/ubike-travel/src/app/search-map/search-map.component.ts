import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import arrowIosBackIcon from '@iconify/icons-eva/arrow-ios-back-fill';
import timesIcon from '@iconify/icons-prime/times';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TdxService } from '../../../../../libs/util';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SelectItem, AutoCompleteSearchEvent, BikeStationInfo, ToastMsg, SeverityEnum, BikeStation, ScenicSpotTourismInfo, RestaurantTourismInfo } from '../../../../../libs/viewmodels';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { DecimalPipe } from '@angular/common';
import attraction from '@iconify/icons-maki/attraction';
import food from '@iconify/icons-fluent/food-16-filled';
import mapMarker from '@iconify/icons-fontisto/map-marker-alt';
import clockIcon from '@iconify/icons-akar-icons/clock';

interface ScenicSpotTourismInfoExt extends ScenicSpotTourismInfo {
  distance?: number;
}
interface RestaurantTourismInfoExt extends RestaurantTourismInfo {
  distance?: number;
}

@Component({
  selector: 'hexschool-f2e-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit, OnDestroy {
  arrowIosBackIcon = arrowIosBackIcon;
  timesIcon = timesIcon;
  showTypes: SelectItem[] = [];
  selectedShowType: 0 | 1 | 2 = 0;
  lat = 25.0743691;
  lng = 121.3761359;
  stationResource: BikeStation[] = [];
  results: SelectItem[] = [];
  selectedCity = 'NewTaipei';
  stations: BikeStationInfo[] = [];
  debouncer = new Subject<{ lat: number, lng: number }>();
  // 0 尚未選擇站點 1 已經選擇站點
  showStep: 0 | 1 = 0;
  selectedStation?: BikeStationInfo;
  // 計時開啟
  startTime = false;
  startDatetime: any;
  interval: any;
  times = '00:00:00';
  // 使用者
  userLat = this.lat;
  userLng = this.lng;
  searchSelectedStation?: SelectItem;
  // 顯示腳踏車道
  showBicycling = false;
  // 探索附近
  exploreMode = false;
  attractionIcon = attraction;
  foodIcon = food;
  mapMarkerIcon = mapMarker;
  clockIcon = clockIcon;
  attractions: ScenicSpotTourismInfoExt[] = [];
  restaurants: RestaurantTourismInfoExt[] = [];
  // 路線
  nextSpotLat?: number;
  nextSpotLon?: number;
  paths: any[] = [];;

  constructor(
    private service: TdxService,
    private router: Router,
    private messageService: MessageService,
    private pipe: DecimalPipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initShowType();
    this.searchStations();
    const params = this.route.snapshot.params;
    if (params.lat && params.lng) {
      this.lat = parseFloat(params.lat);
      this.lng = parseFloat(params.lng);
      this.searchStations();
    } else {
      this.getCurrentLocation();
    }
    this.debouncer.pipe(debounceTime(500)).subscribe(value => {
      this.lat = value.lat;
      this.lng = value.lng;
      this.searchStations();
    });
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
    clearInterval(this.interval);
  }

  initShowType(): void {
    this.showTypes = [
      new SelectItem('顯示全部', 0),
      new SelectItem('顯示可借站點', 1),
      new SelectItem('顯示可還站點', 2),
    ];
  }

  search(event: AutoCompleteSearchEvent): void {
    this.service.fetchStationNearBy(this.lat + '', this.lng + '', 1000, 100).subscribe(res => {
      this.stationResource = res;
      this.results = res
        .filter(item => item && item.StationName && item.StationName.Zh_tw ? item.StationName.Zh_tw.indexOf(event.query) > -1 : false)
        .map(item => new SelectItem(item.StationName && item.StationName.Zh_tw ? item.StationName.Zh_tw.slice(7) : '', item.StationUID));
    });
  }

  async onStationSelect(event: SelectItem): Promise<void> {
    const station = this.stationResource.find(item => item.StationUID === event.value);
    if (station && station.StationPosition.PositionLat && station.StationPosition.PositionLon) {
      this.lat = station.StationPosition.PositionLat;
      this.lng = station.StationPosition.PositionLon;
      await this.searchStations();
      const stationInfo = this.stations.find(item => item.StationUID === event.value);
      if (stationInfo) {
        this.onMarkerClick(stationInfo);
      } else {
        this.messageService.add(new ToastMsg(SeverityEnum.warn, '選擇的站點失敗', '無法取得站點停車資訊'));
      }
    } else {
      this.messageService.add(new ToastMsg(SeverityEnum.warn, '選擇的站點失敗', '選擇的站點無地理位置資料'));
    }
  }

  searchStations(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.stations = [];
      const fetchStations = this.service.fetchStationNearBy(this.lat + '', this.lng + '', 1000, 100);
      const fetchAvailablity = this.service.fetchStationAvailablityNearBy(this.lat + '', this.lng + '', 1000, 100);
      forkJoin([fetchStations, fetchAvailablity]).pipe(debounceTime(500)).subscribe(res => {
        res[0].forEach(station => {
          const ava = res[1].find(a => a.StationUID === station.StationUID);
          if (station && ava) {
            const row = new BikeStationInfo(station.StationUID, station.StationID, station.AuthorityID, station.StationName, station.StationPosition, station.StationAddress, station.StopDescription, station.BikesCapacity, station.ServiceType, ava?.UpdateTime, ava?.ServiceStatus, ava?.AvailableRentBikes, ava?.AvailableReturnBikes);
            this.stations.push(row);
          }
        });
        resolve(true);
      });
    });
  }

  onMapChange(event: { lat: number, lng: number }): void {
    this.debouncer.next(event);
  }

  onBackClick(): void {
    this.router.navigate(['']);
  }

  onMarkerClick(station: BikeStationInfo): void {
    this.selectedStation = station;
    this.showStep = 1;
    this.nextSpotLat = station.StationPosition.PositionLat || 0;
    this.nextSpotLon = station.StationPosition.PositionLon || 0;
    // this.service.getDirections(this.userLat, this.userLng, this.nextSpotLat, this.nextSpotLon).subscribe(res => {
    //   console.log(res);
    //   const routes = res.routes;
    //   const legs = routes[0].lengs;
    //   const leg = legs[0];
    //   const steps = leg.steps;
    //   this.paths = steps.map((step: any) => {
    //     return { lat: step.end_location.lat, lng: step.end_location.lng };
    //   })
    // });

    // const client = new Client({});
    // client.directions({
    //   params: {
    //     origin: [this.userLat, this.userLng],
    //     destination: [this.nextSpotLat, this.nextSpotLon],
    //     mode: TravelMode.bicycling,
    //     key: 'AIzaSyABCnBx0dgze3XWV51Ejp42sKWQjo64pco'
    //   }
    // }).then(res => {
    //   console.info(res);
    // }).catch(error => {
    //   console.error(error);
    // });

    // this.paths = [
    //   { lat: this.userLat, lng: this.userLng },
    //   { lat: this.nextSpotLat, lng: this.nextSpotLon },
    // ]
    // console.info(this.userLat, this.userLng, this.nextSpotLat, this.nextSpotLon);
  }

  getCurrentLocation(): void {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;
        this.searchStations();
        // this.messageService.add(new ToastMsg(SeverityEnum.success, '已經取得目前位置', '已經移動到您的位置'));
      }, () => {
        this.messageService.add(new ToastMsg(SeverityEnum.warn, '無法取得目前位置', '您的裝置尚未允許取得地理位置權限'));
      });
    } else {
      this.messageService.add(new ToastMsg(SeverityEnum.warn, '無法取得目前位置', '您的裝置不支援取得地理位置功能'));
      /* geolocation IS NOT available */
    }
  }

  onStepBackClick(): void {
    this.showStep = 0;
    this.selectedStation = undefined;
    this.searchSelectedStation = undefined;
  }

  onTimeClick(): void {
    this.startTime = true;
    this.startDatetime = moment();
    this.interval = setInterval(() => {
      this.times = this.countTime();
    }, 200);
    // this.stations = JSON.parse(JSON.stringify(this.stations));
  }

  onTimeStopClick(): void {
    this.startTime = false;
    this.startDatetime = null;
    this.times = '00:00:00';
    clearInterval(this.interval);
    // this.stations = JSON.parse(JSON.stringify(this.stations));
  }

  countTime(): string {
    if (this.startTime && this.startDatetime) {
      const cur = moment();
      let seconds = cur.unix() - this.startDatetime.unix();
      const hour = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds - hour * 3600) / 60);
      seconds = seconds - hour * 3600 - minutes * 60;
      return `${this.pipe.transform(hour, '2.0-0')}:${this.pipe.transform(minutes, '2.0-0')}:${this.pipe.transform(seconds, '2.0-0')}`;
    } else {
      return '00:00:00';
    }
  }

  onNearSearchClick(): void {
    this.getCurrentLocation();
  }

  onExploreNearClick(): void {
    this.exploreMode = true;
    this.exploreNearby();
  }

  onCloseExploreClick(): void {
    this.exploreMode = false;
  }

  exploreNearby(): void {
    this.service.fetchAttractionNearBy(this.lat, this.lng, 5000).subscribe(res => {
      this.attractions = res
        .map((item: ScenicSpotTourismInfoExt) => {
          item.distance = this.countDistance(this.lat, this.lng, item.Position.PositionLat || 0, item.Position.PositionLon || 0);
          return item;
        })
        .sort((a, b) => {
          if (a.distance && b.distance) {
            if (a.distance > b.distance) { return 1; }
            if (a.distance < b.distance) { return -1; }
            return 0;
          } else {
            return 0;
          }
        });
    });
    this.service.fetchRestaurantNearBy(this.lat, this.lng, 5000).subscribe(res => {
      this.restaurants = res
        .map((item: RestaurantTourismInfoExt) => {
          item.distance = this.countDistance(this.lat, this.lng, item.Position.PositionLat || 0, item.Position.PositionLon || 0);
          return item;
        })
        .sort((a, b) => {
          if (a.distance && b.distance) {
            if (a.distance > b.distance) { return 1; }
            if (a.distance < b.distance) { return -1; }
            return 0;
          } else {
            return 0;
          }
        });
    });
  }

  getAttractionImage(spot: ScenicSpotTourismInfo): string {
    const url = spot && spot.Picture && spot.Picture.PictureUrl1 ? spot.Picture.PictureUrl1 : './assets/default_spot.jpg';
    return `url(${url})`;
  }

  getRestaurantImage(spot: RestaurantTourismInfo): string {
    const url = spot && spot.Picture && spot.Picture.PictureUrl1 ? spot.Picture.PictureUrl1 : './assets/default_spot.jpg';
    return `url(${url})`;
  }

  /**
   * 計算距離，單位公尺
   */
  countDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 * 1000;
      return Math.floor(dist);
    }
  }
}
