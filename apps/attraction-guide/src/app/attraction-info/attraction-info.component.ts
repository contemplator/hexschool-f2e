import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScenicSpotTourismInfo } from '../../../../../libs/viewmodels';
import { AppService } from '../app.service';
import marker from '@iconify/icons-fontisto/map-marker-alt';
import leaf from '@iconify/icons-fluent/leaf-one-16-filled';
import mapMarker from '@iconify/icons-clarity/map-marker-line';
import time from '@iconify/icons-carbon/time';
import ticket from '@iconify/icons-fluent/ticket-diagonal-16-regular';
import warning from '@iconify/icons-clarity/warning-standard-line';
import parking from '@iconify/icons-uil/parking-square';
import global from '@iconify/icons-ant-design/global-outlined';
import mapIcon from '@iconify/icons-akar-icons/map';
import phone from '@iconify/icons-carbon/phone';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'hexschool-f2e-attraction-info',
  templateUrl: './attraction-info.component.html',
  styleUrls: ['./attraction-info.component.scss']
})
export class AttractionInfoComponent implements OnInit {
  attraction: ScenicSpotTourismInfo | null = null;
  markerIcon = marker;
  leafIcon = leaf;
  mapMarkerIcon = mapMarker;
  timeIcon = time;
  ticketIcon = ticket;
  warningIcon = warning;
  parkingIcon = parking;
  globalIcon = global;
  mapIcon = mapIcon;
  phoneIcon = phone;

  constructor(
    private service: AppService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.attraction = this.service.attraction;
  }

  getAttractionImage(): string {
    return this.attraction && this.attraction.Picture && this.attraction.Picture.PictureUrl1 ? this.attraction.Picture.PictureUrl1 : '';
  }

  getAttractionClass(): string {
    const result: string[] = [];
    if (this.attraction && this.attraction.Class1) {
      result.push(this.attraction.Class1)
    }
    if (this.attraction && this.attraction.Class2) {
      result.push(this.attraction.Class2)
    }
    if (this.attraction && this.attraction.Class3) {
      result.push(this.attraction.Class3)
    }
    return result.length > 0 ? result.join('、') : '景點';
  }

  getAttractionDesc(): string[] {
    const result = this.attraction && this.attraction.DescriptionDetail ? this.attraction?.DescriptionDetail.trim().replace(/\s/g, '\n\r') : 'Desc';
    return result.split('\n\r');
  }

  getParkingPosition(): string {
    return this.attraction && this.attraction.Position && this.attraction.Position.PositionLat && this.attraction.Position.PositionLon ? `https://www.google.com.tw/maps/@${this.attraction.Position.PositionLat},${this.attraction.Position.PositionLon},10z?hl=zh-TW` : '';
  }

  getPosition(): string {
    const url = `https://www.google.com/maps/search/?api=1&query=${this.attraction?.Name}`
    try {
      return encodeURI(url);
    } catch (error) {
      return 'https://www.google.com/maps/search/';
    }
  }

  getMapPosition(): SafeUrl {
    if (this.attraction && this.attraction.Name) {
      const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyABCnBx0dgze3XWV51Ejp42sKWQjo64pco&q=${this.attraction.Name}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return '';
    }
  }

}
