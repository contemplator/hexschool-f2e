import { Component } from '@angular/core';
import { Router } from '@angular/router';
import stamp from '@iconify/icons-jam/stamp';

@Component({
  selector: 'hexschool-f2e-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'attration-guide';
  stampIcon = stamp;

  constructor(
    private router: Router
  ) {

  }

  onBackClick(): void {
    window.history.go(-1);
  }

  onIndexClick(): void {
    this.router.navigate(['']);
  }

  onFavoriateClick(): void {
    this.router.navigate(['favoriate']);
  }

  onCollectionClick(): void {
    this.router.navigate(['collection']);
  }
}
