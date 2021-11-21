import { Component, OnInit } from '@angular/core';
import { TdxService } from '../../../../../libs/tdx-service/src/lib/tdx.service';
import { UbikeCityData } from '../../../../../libs/data/index';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SelectItem, AutoCompleteSearchEvent, BikeStation } from '../../../../../libs/viewmodels';
import { Router } from '@angular/router';

@Component({
  selector: 'hexschool-f2e-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  title = 'ubike-travel';
  cities: SelectItem[] = [];
  selectedCity = 'Taipei';
  results: SelectItem[] = [];
  stationResource: BikeStation[] = [];

  constructor(
    private service: TdxService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cities = UbikeCityData.map(item => {
      return new SelectItem(item.CityName, item.CityEngName);
    });
  }

  search(event: AutoCompleteSearchEvent): void {
    this.service.fetchStationsByCity(this.selectedCity, 1000).subscribe(res => {
      this.stationResource = res;
      this.results = res
        .filter(item => item && item.StationName && item.StationName.Zh_tw ? item.StationName.Zh_tw.indexOf(event.query) > -1 : false)
        .map(item => new SelectItem(item.StationName && item.StationName.Zh_tw ? item.StationName.Zh_tw.slice(11) : '', item.StationUID));
    });
  }

  onStationSelect(event: SelectItem): void {
    const station = this.stationResource.find(item => item.StationUID === event.value);
    if (station) {
      this.router.navigate(['search-map', station.StationPosition.PositionLat, station.StationPosition.PositionLon]);
    }
  }

  onSearchNearbyClick(): void {
    this.router.navigate(['search-map']);
  }
}
