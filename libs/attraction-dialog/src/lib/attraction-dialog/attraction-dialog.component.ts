import { Component, EventEmitter, Input, Output } from '@angular/core';
import timesLine from '@iconify/icons-clarity/times-line';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScenicSpotTourismInfo, TourismPicture } from '../../../../viewmodels';
import marker from '@iconify/icons-fontisto/map-marker-alt';

@Component({
  selector: 'hexschool-f2e-attraction-dialog',
  templateUrl: './attraction-dialog.component.html',
  styleUrls: ['./attraction-dialog.component.scss']
})
export class AttractionDialogComponent {
  @Input() display = true;
  @Input() attraction: {
    Name?: string,
    City?: string,
    Picture?: TourismPicture
  } | null = null;
  @Output() closeDialog: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() moreClick: EventEmitter<any> = new EventEmitter();
  timesLineIcon = timesLine;
  markerIcon = marker;

  getAttractionImage(): string {
    return this.attraction && this.attraction.Picture && this.attraction.Picture.PictureUrl1 ? this.attraction.Picture.PictureUrl1 : '';
  }

  onCloseClick(event: MouseEvent): void {
    this.closeDialog.emit(event);
  }

  onMoreClick(): void {
    this.moreClick.emit(this.attraction);
  }
}
