import { Component, Input } from '@angular/core';

@Component({
  selector: 'hexschool-f2e-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title = 'Bus Go';
}
