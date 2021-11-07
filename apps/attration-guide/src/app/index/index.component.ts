import { Component, OnInit } from '@angular/core';

class Carousel {
  title: string;
  img_path: string;
  link: string;

  /**
   * 輪播圖
   * @param title 標題
   * @param img_path 圖檔路徑
   * @param link 連結
   */
  constructor(title: string, img_path: string, link: string) {
    this.title = title;
    this.img_path = img_path;
    this.link = link;
  }
}

@Component({
  selector: 'hexschool-f2e-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  showSearch = false;
  searchKeyword = '';
  carouselList: Carousel[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.carouselList = [
      new Carousel('北台灣', 'url("./assets/carousel/北台灣.png")', '/index'),
      new Carousel('正濱漁港', 'url("./assets/carousel/正濱漁港.png")', '/index'),
    ];
  }

}
