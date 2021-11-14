import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RestaurantTourismInfo, SelectItem, TourismPicture } from 'libs/viewmodels';
import { AppService } from '../../app.service';
import marker from '@iconify/icons-fontisto/map-marker-alt';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AreaCityData } from '../../../../../../libs/data';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'hexschool-f2e-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  @Input() showSearch = true;
  areaOptions: SelectItem[] = [];
  selectedArea = '';
  cityOptions: SelectItem[] = [];
  selectedCity = '';
  searchKeyword = '';
  hotSpot: string[] = [];
  markerIcon = marker;
  showDialog = false;
  attractions: RestaurantTourismInfo[] = [];
  showAttraction: RestaurantTourismInfo | null = null;

  constructor(
    public service: AppService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.initOptions();
    this.searchAttractions();
  }

  initOptions(): void {
    this.areaOptions = AreaCityData.map(item => new SelectItem(item.AreaName, item.AreaName));
    this.selectedArea = this.areaOptions[0].value;
    this.cityOptions = AreaCityData.filter(item => item.AreaName === this.selectedArea)[0].CityList.map(item => new SelectItem(item.CityName, item.CityEngName));
    this.selectedCity = this.cityOptions[0].value;
    this.hotSpot = ['礁溪', '北投', '萬里', '陽明山'];
  }

  searchAttractions(): void {
    this.service.searchCityRestaurant(this.selectedCity).subscribe(res => {
      this.attractions = res.filter(item => item.Name && item.Name.indexOf(this.searchKeyword) > -1);
    });
  }

  onAreaChange(): void {
    this.cityOptions = AreaCityData.filter(item => item.AreaName === this.selectedArea)[0].CityList.map(item => new SelectItem(item.CityName, item.CityEngName));
    this.selectedCity = this.cityOptions[0].value;
    this.searchAttractions();
  }

  onCityChange(): void {
    this.searchAttractions();
  }

  getAttractionImage(picture: TourismPicture | undefined): SafeUrl {
    return picture && picture.PictureUrl1 ? `url(${picture.PictureUrl1})` : 'url(./assets/carousel/北台灣.png)';
  }

  onAttractionClick(attraction: RestaurantTourismInfo): void {
    this.showAttraction = attraction;
    this.showDialog = true;
    console.log(JSON.stringify(attraction));
  }

  onDialogClose(event: MouseEvent): void {
    this.showAttraction = null;
    this.showDialog = false;
  }

  onMoreClick(attraction: RestaurantTourismInfo | null): void {
    this.service.restaurant = attraction || this.service.restaurant;
    this.router.navigate(['restaurant-info', attraction ? attraction.ID : 0]);
  }
}
