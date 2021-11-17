import { Component, EventEmitter, Input, Output } from '@angular/core';
import searchIcon from '@iconify/icons-akar-icons/search';

@Component({
  selector: 'hexschool-f2e-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() inputType = 'text';
  @Input() placeholder = 'search hint';
  @Input() searchKeyword = '';
  @Output() searchKeywordChange = new EventEmitter<string>();
  searchIcon = searchIcon;
}
