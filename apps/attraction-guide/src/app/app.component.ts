import { Component } from '@angular/core';

@Component({
  selector: 'hexschool-f2e-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'attration-guide';

  onBackClick(): void {
    window.history.go(-1);
  }
}
