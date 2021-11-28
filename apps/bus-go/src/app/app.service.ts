import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  city = '';
  dynamicShowType = 1; // 1 列表 2 地圖
  dynamicShowTypeChange: Subject<number> = new Subject<number>();

  constructor() {
    this.dynamicShowTypeChange.subscribe((value) => {
      this.dynamicShowType = value;
      console.log(value);
    });
  }

  toggleDynamicShowType() {
    this.dynamicShowTypeChange.next(this.dynamicShowType === 1 ? 2 : 1);
  }
}
