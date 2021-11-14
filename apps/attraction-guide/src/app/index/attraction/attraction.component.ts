import { Component, Input, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AreaCityData } from '../../../../../../libs/data';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SelectItem } from '../../../../../../libs/viewmodels';
import { AppService } from '../../app.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScenicSpotTourismInfo, TourismPicture } from '../../../../../../libs/viewmodels';
import { SafeUrl } from '@angular/platform-browser';
import marker from '@iconify/icons-fontisto/map-marker-alt';
import { Router } from '@angular/router';

@Component({
  selector: 'hexschool-f2e-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss']
})
export class AttractionComponent implements OnInit {
  @Input() showSearch = true;
  areaOptions: SelectItem[] = [];
  selectedArea = '';
  cityOptions: SelectItem[] = [];
  selectedCity = '';
  searchKeyword = '';
  hotSpot: string[] = [];
  attractions: ScenicSpotTourismInfo[] = [];
  markerIcon = marker;
  showDialog = false;
  showAttraction: ScenicSpotTourismInfo | null = null;

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
    this.service.searchCitySpot(this.selectedCity).subscribe(res => {
      this.attractions = res.filter(item => item.Name.indexOf(this.searchKeyword) > -1);
    });
  }

  onAreaChange(): void {
    this.cityOptions = AreaCityData.filter(item => item.AreaName === this.selectedArea)[0].CityList.map(item => new SelectItem(item.CityName, item.CityEngName));
    this.selectedCity = this.cityOptions[0].value;
    this.searchAttractions();
  }

  getAttractionImage(picture: TourismPicture): SafeUrl {
    return picture && picture.PictureUrl1 ? `url(${picture.PictureUrl1})` : '';
  }

  onAttractionClick(attraction: ScenicSpotTourismInfo): void {
    this.showAttraction = attraction;
    this.showDialog = true;
    console.log(JSON.stringify(attraction));
  }

  onDialogClose(event: MouseEvent): void {
    this.showAttraction = null;
    this.showDialog = false;
  }

  onMoreClick(attraction: ScenicSpotTourismInfo | null): void {
    this.service.attraction = attraction || this.service.attraction;
    this.router.navigate(['attraction-info', attraction ? attraction.ID : 0]);
  }
}
