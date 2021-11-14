import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AreaCityData } from '../../../../../libs/data';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { City } from '../../../../../libs/viewmodels';
@Component({
  selector: 'hexschool-f2e-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  cities: City[] = [];
  collected: string[] = [];

  constructor(
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.fetchStampsCollection();
  }

  fetchStampsCollection(): void {
    // 區域性
    AreaCityData.forEach(area => {
      area.CityList.forEach(city => {
        this.cities.push(city);
      });
    });
    this.collected = [];
    this.cities.forEach(city => {
      const isCollected = Math.random() > 0.5;
      if (isCollected === true) {
        this.collected.push(city.CityEngName);
      }
    });
  }

  isCollected(areaEngName: string): boolean {
    return this.collected.indexOf(areaEngName) > -1;
  }

  getStampImagePath(areaEngName: string): string {
    return this.isCollected(areaEngName) ? `./assets/stamps/${areaEngName}.png` : './assets/stamps/Empty.png'
  }
}
