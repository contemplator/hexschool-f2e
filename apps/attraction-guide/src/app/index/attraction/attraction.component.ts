import { Component, OnInit } from '@angular/core';
import { AreaCityData } from '../../../../../../libs/data';
import { SelectItem } from '../../../../../../libs/viewmodels';
import { AppService } from '../../app.service';
import { ScenicSpotTourismInfo, TourismPicture } from '../../../../../../libs/viewmodels';
import { SafeUrl } from '@angular/platform-browser';
import marker from '@iconify/icons-fontisto/map-marker-alt';

@Component({
  selector: 'hexschool-f2e-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss']
})
export class AttractionComponent implements OnInit {
  areaOptions: SelectItem[] = [];
  selectedArea = '';
  cityOptions: SelectItem[] = [];
  selectedCity = '';
  searchKeyword = '';
  hotSpot: string[] = [];
  attractions: ScenicSpotTourismInfo[] = [];
  markerIcon = marker;

  constructor(
    private service: AppService
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
    this.service.searchCitySpot(this.selectedCity).subscribe(res => {
      this.attractions = res;
      console.log(this.attractions);
    });
  }

  getAttractionImage(picture: TourismPicture): SafeUrl {
    return picture && picture.PictureUrl1 ? `url(${picture.PictureUrl1})` : '';
  }
}
