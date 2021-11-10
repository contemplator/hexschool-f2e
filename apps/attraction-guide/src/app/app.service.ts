
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';
import * as moment from 'moment';
import { ScenicSpotTourismInfo } from '../../../../libs/viewmodels';

@Injectable({ providedIn: 'root' })
export class AppService {
  appId = 'fcfb4ac781724b159db7fc6786ba7395';
  appKey = 'U6A4rgBSW8B5WYKjredCNnOaiCc';
  attraction: ScenicSpotTourismInfo = { "ID": "C1_315081200H_000003", "Name": "神仙谷", "DescriptionDetail": "苗栗南庄神仙谷海拔約650公尺，是由鹿湖溪、鹿場溪、風美溪匯流切割而成的峽谷地形，因斷層岩床形成數十公尺的高度差。奔騰的流水從上層岩床傾瀉而下，而有壯闊的瀑布景致，讓人不禁讚嘆大自然的鬼斧神工。值得一提的是，神仙谷的特殊地景，受到導演魏德聖的青睞，而選定神仙谷為電影「賽德克巴萊」的拍攝場地之一。漫步神仙谷瀑布與吊橋　　神仙谷是泰雅族人的祖靈聖地，昔日稱為死亡谷，是鄰近鹿場部落埋葬先人的地方，曾經長年封閉，經過參山國家風景區管理處整修後，在山谷間設置了木棧道與刻有原住民圖騰的吊橋，飛瀑美景才得以重現遊客眼前。正所謂「橫看成嶺側成峰，遠近高低各不同」，從木棧道漫步到吊橋，能欣賞到不同角度的神仙谷瀑布，佇立橋上眺覽，上游是壯闊的河床，下游是碧綠清澈的峽谷，神仙谷的景致可說是盡收眼底!部落景觀餐廳 近距離欣賞瀑布美景　　進入神仙谷步道的入口後，會看到醒目的七分醉瀑布景觀告示牌，餐廳內的牆上掛著色彩豐富的畫作及傳統圖騰，能感受到滿滿的部落風情，在這裡用餐除了能品嘗道地的原住民風味餐，還能聆聽餐廳老闆現場演唱，可說是放鬆身心的好去處；穿過餐廳沿著階梯走下去，便來到透明玻璃平台，遊客可以近距離觀賞磅礡壯闊的瀑布景觀，下過雨後雲霧繚繞於瀑布間，宛若置身於仙境，也難怪會有「神仙谷」的美稱。", "Description": "苗栗南庄神仙谷海拔約650公尺，是由鹿湖溪、鹿場溪、風美溪匯流切割而成的峽谷地形，因斷層岩床形成數十公尺的高度差。奔騰的流水從上層岩床傾瀉而下，而有壯闊的瀑布景致，讓人不禁讚嘆大自然的鬼斧神工。值得一提的是，神仙谷的特殊地景，受到導演魏德聖的青睞，而選定神仙谷為電影「賽德克巴萊」的拍攝場地之一。漫步神仙谷瀑布與吊橋　　神仙谷是泰雅族人的祖靈聖地，昔日稱為死亡谷，是鄰近鹿場部落埋葬先人的", "Phone": "886-3-7824570", "Address": "353苗栗縣南庄鄉苗21線往鹿場方向", "OpenTime": "全天", "Picture": { "PictureUrl1": "https://www.trimt-nsa.gov.tw/Content/Uploads/StrollArea/Detail/a8d8c147-c9e8-474d-96c6-644ccd37e6ee_thumb.jpg", "PictureDescription1": "神仙谷" }, "Position": { "PositionLon": 121.03048706054688, "PositionLat": 24.545679092407227, "GeoHash": "wsq5dh7sy" }, "ParkingPosition": { }, "City": "苗栗縣", "SrcUpdateTime": "2021-11-10T01:15:37+08:00", "UpdateTime": "2021-11-10T01:40:14+08:00" };

  constructor(private http: HttpClient) { }

  private get(url: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': this.getAuthorization(),
        'x-date': moment().add(-8, 'hour').format('ddd, DD MMM yyyy HH:mm:ss') + ' GMT'
      })
    };

    return this.http.get(url, options);
  }

  private getAuthorization(): string {
    const dateStr = moment().add(-8, 'hour').format('ddd, DD MMM yyyy HH:mm:ss') + ' GMT';
    const signature = crypto.HmacSHA1("x-date: " + dateStr, this.appKey);
    const base64 = crypto.enc.Base64.stringify(signature);
    const result = `hmac username="${this.appId}", algorithm="hmac-sha1", headers="x-date", signature="${base64}"`;
    return result;
  }

  // private parseJSONtoParams(data: any): string {
  //   console.log(data);
  //   const params = new URLSearchParams();
  //   for (const key in data) {
  //     if (typeof (data[key]) === 'object') {
  //       params.append(key, JSON.stringify(data[key]));
  //     } else {
  //       params.append(key, data[key]);
  //     }
  //   }
  //   return params.toString();
  // }

  private parsePureCharParams(data: any): string {
    const result: string[] = [];
    for (const key in data) {
      result.push(`${key}=${data[key]}`);
    }
    return result.join('&');
  }

  searchCitySpot(city: string, $top = 30, $skip = 0): Observable<ScenicSpotTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?${params}&$format=JSON`;
    return this.get(url);
  }
}