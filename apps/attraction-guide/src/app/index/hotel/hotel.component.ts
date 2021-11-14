import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SafeUrl } from '@angular/platform-browser';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AreaCityData } from '../../../../../../libs/data';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { HotelTourismInfo, SelectItem, TourismPicture } from 'libs/viewmodels';
import marker from '@iconify/icons-fontisto/map-marker-alt';

@Component({
  selector: 'hexschool-f2e-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  @Input() showSearch = true;
  areaOptions: SelectItem[] = [];
  selectedArea = '';
  cityOptions: SelectItem[] = [];
  selectedCity = '';
  searchKeyword = '';
  hotSpot: string[] = [];
  markerIcon = marker;
  showDialog = false;
  attractions: HotelTourismInfo[] = [];
  showAttraction: HotelTourismInfo | null = null;

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
    this.service.searchCityHotel(this.selectedCity).subscribe(res => {
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
    return picture && picture.PictureUrl1 ? `url(${picture.PictureUrl1})` : '';
  }

  onAttractionClick(attraction: HotelTourismInfo): void {
    this.showAttraction = attraction;
    this.showDialog = true;
  }

  onDialogClose(event: MouseEvent): void {
    this.showAttraction = null;
    this.showDialog = false;
  }

  onMoreClick(attraction: HotelTourismInfo | null): void {
    this.service.restaurant = attraction || this.service.restaurant;
    this.router.navigate(['hotel-info', attraction ? attraction.ID : 0]);
  }
}
