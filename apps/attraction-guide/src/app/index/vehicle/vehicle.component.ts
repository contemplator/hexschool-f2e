import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BusA1Data } from 'libs/viewmodels';
import { AppService } from '../../app.service';

@Component({
  selector: 'hexschool-f2e-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  @Input() showSearch = true;
  searchKeyword = '';
  hotSpot: string[] = [];
  attractions: BusA1Data[] = [];

  constructor(
    public service: AppService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.initOptions();
    this.searchAttractions();
  }

  initOptions(): void {
    this.hotSpot = ['礁溪', '北投', '萬里', '陽明山'];
  }

  searchAttractions(): void {
    this.service.searchTaiwanTrip().subscribe(res => {
      this.attractions = res.filter(item => (item.TaiwanTripName && item.TaiwanTripName.Zh_tw && item.TaiwanTripName.Zh_tw.indexOf(this.searchKeyword) > -1) ||
        (item.TaiwanTripName && item.TaiwanTripName.En && item.TaiwanTripName.En.indexOf(this.searchKeyword) > -1));
    });
  }

  onAttractionClick(attraction: BusA1Data): void {
    this.service.bus = (attraction.TaiwanTripName && attraction.TaiwanTripName.Zh_tw) || this.service.bus;
    this.router.navigate(['bus-info', attraction ? attraction.TaiwanTripName : 0]);
  }
}
