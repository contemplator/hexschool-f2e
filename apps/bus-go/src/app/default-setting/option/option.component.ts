import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hexschool-f2e-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {

  constructor(
    private router: Router
  ) { }

  onCityClick(): void {
    this.router.navigate(['default-setting', 'cities']);
  }

  onPositionClick(): void {
    this.router.navigate(['index']);
  }

}
