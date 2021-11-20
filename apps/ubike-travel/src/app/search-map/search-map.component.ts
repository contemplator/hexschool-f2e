import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import arrowIosBackIcon from '@iconify/icons-eva/arrow-ios-back-fill';
import timesIcon from '@iconify/icons-prime/times';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TdxService } from '../../../../../libs/tdx-service/src/lib/tdx.service';
import { SelectItem, AutoCompleteSearchEvent, BikeStationInfo } from '../../../../../libs/viewmodels';

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
  results: string[] = [];
  selectedCity = 'NewTaipei';
  stations: BikeStationInfo[] = [];
  debouncer = new Subject<{ lat: number, lng: number }>();

  constructor(
    private service: TdxService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initShowType();
    this.searchStations();
    this.debouncer.pipe(debounceTime(500)).subscribe(value => {
      console.log(value);
      this.lat = value.lat;
      this.lng = value.lng;
      this.searchStations();
    });
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
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
      console.log(res);
      this.results = res
        .filter(item => item && item.StationName && item.StationName.Zh_tw ? item.StationName.Zh_tw.indexOf(event.query) > -1 : false)
        .map(item => item.StationName && item.StationName.Zh_tw ? item.StationName.Zh_tw.slice(11) : '');
    });
  }

  onStationSelect(event: any): void {
    console.info(event);
  }

  searchStations(): void {
    this.stations = [];
    const fetchStations = this.service.fetchStationNearBy(this.lat + '', this.lng + '', 1000, 100);
    const fetchAvailablity = this.service.fetchStationAvailablityNearBy(this.lat + '', this.lng + '', 1000, 100);
    forkJoin([fetchStations, fetchAvailablity]).pipe(debounceTime(500)).subscribe(res => {
      console.log(res);
      res[0].forEach(station => {
        const ava = res[1].find(a => a.StationUID === station.StationUID);
        if (station && ava) {
          const row = new BikeStationInfo(station.StationUID, station.StationID, station.AuthorityID, station.StationName, station.StationPosition, station.StationAddress, station.StopDescription, station.BikesCapacity, station.ServiceType, ava?.UpdateTime, ava?.ServiceStatus, ava?.AvailableRentBikes, ava?.AvailableReturnBikes);
          this.stations.push(row);
        }
      });
      console.log(this.stations);
    });
  }

  onMapChange(event: { lat: number, lng: number }): void {
    this.debouncer.next(event);
  }

  onBackClick(): void {
    this.router.navigate(['']);
  }

  onMarkerClick(station: BikeStationInfo): void {
    console.log(station);
  }
}
