
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';
import * as moment from 'moment';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScenicSpotTourismInfo, RestaurantTourismInfo, HotelTourismInfo, BusA1Data } from '../../../../libs/viewmodels';

@Injectable({ providedIn: 'root' })
export class AppService {
  appId = 'fcfb4ac781724b159db7fc6786ba7395';
  appKey = 'U6A4rgBSW8B5WYKjredCNnOaiCc';
  attraction: ScenicSpotTourismInfo = { "ID": "C1_315081200H_000003", "Name": "神仙谷", "DescriptionDetail": "苗栗南庄神仙谷海拔約650公尺，是由鹿湖溪、鹿場溪、風美溪匯流切割而成的峽谷地形，因斷層岩床形成數十公尺的高度差。奔騰的流水從上層岩床傾瀉而下，而有壯闊的瀑布景致，讓人不禁讚嘆大自然的鬼斧神工。值得一提的是，神仙谷的特殊地景，受到導演魏德聖的青睞，而選定神仙谷為電影「賽德克巴萊」的拍攝場地之一。漫步神仙谷瀑布與吊橋　　神仙谷是泰雅族人的祖靈聖地，昔日稱為死亡谷，是鄰近鹿場部落埋葬先人的地方，曾經長年封閉，經過參山國家風景區管理處整修後，在山谷間設置了木棧道與刻有原住民圖騰的吊橋，飛瀑美景才得以重現遊客眼前。正所謂「橫看成嶺側成峰，遠近高低各不同」，從木棧道漫步到吊橋，能欣賞到不同角度的神仙谷瀑布，佇立橋上眺覽，上游是壯闊的河床，下游是碧綠清澈的峽谷，神仙谷的景致可說是盡收眼底!部落景觀餐廳 近距離欣賞瀑布美景　　進入神仙谷步道的入口後，會看到醒目的七分醉瀑布景觀告示牌，餐廳內的牆上掛著色彩豐富的畫作及傳統圖騰，能感受到滿滿的部落風情，在這裡用餐除了能品嘗道地的原住民風味餐，還能聆聽餐廳老闆現場演唱，可說是放鬆身心的好去處；穿過餐廳沿著階梯走下去，便來到透明玻璃平台，遊客可以近距離觀賞磅礡壯闊的瀑布景觀，下過雨後雲霧繚繞於瀑布間，宛若置身於仙境，也難怪會有「神仙谷」的美稱。", "Description": "苗栗南庄神仙谷海拔約650公尺，是由鹿湖溪、鹿場溪、風美溪匯流切割而成的峽谷地形，因斷層岩床形成數十公尺的高度差。奔騰的流水從上層岩床傾瀉而下，而有壯闊的瀑布景致，讓人不禁讚嘆大自然的鬼斧神工。值得一提的是，神仙谷的特殊地景，受到導演魏德聖的青睞，而選定神仙谷為電影「賽德克巴萊」的拍攝場地之一。漫步神仙谷瀑布與吊橋　　神仙谷是泰雅族人的祖靈聖地，昔日稱為死亡谷，是鄰近鹿場部落埋葬先人的", "Phone": "886-3-7824570", "Address": "353苗栗縣南庄鄉苗21線往鹿場方向", "OpenTime": "全天", "Picture": { "PictureUrl1": "https://www.trimt-nsa.gov.tw/Content/Uploads/StrollArea/Detail/a8d8c147-c9e8-474d-96c6-644ccd37e6ee_thumb.jpg", "PictureDescription1": "神仙谷" }, "Position": { "PositionLon": 121.03048706054688, "PositionLat": 24.545679092407227, "GeoHash": "wsq5dh7sy" }, "ParkingPosition": {}, "City": "苗栗縣", "SrcUpdateTime": "2021-11-10T01:15:37+08:00", "UpdateTime": "2021-11-10T01:40:14+08:00" };
  restaurant: RestaurantTourismInfo = { "ID": "C3_315081200H_000122", "Name": "以客唯鱒", "Description": "「以客唯鱒」位於南庄南江村路旁，伴著蓬萊溪的山水美景，廣大且明亮的用餐環境，到南庄蓬萊一遊，不能錯過的美食餐廳。 以「客」唯「鱒」特色餐廳，菜色著重於客家菜及南庄帝王鱒魚，由主廚「大傅」、「小傅」精心特製的招牌美食，連在地人都推薦的山產、客家菜，絕對讓您胃口大開，抁指回味。 營業特色：客家菜、活鱒魚、山產", "Address": "353苗栗縣南庄鄉長崎下3號", "Phone": "886-3-7825347", "OpenTime": "請洽商家查詢", "Picture": { "PictureUrl1": "https://www.trimt-nsa.gov.tw/Content/Uploads/StrollArea/Detail/d330b7f2-a73b-4bc4-aa91-0273b60be919_thumb.jpg", "PictureDescription1": "以客唯鱒" }, "Position": { "PositionLon": 120.98536682128906, "PositionLat": 24.56916046142578, "GeoHash": "wsq5c0dve" }, "City": "苗栗縣", "SrcUpdateTime": "2021-11-11T01:13:04+08:00", "UpdateTime": "2021-11-11T02:10:14+08:00" };
  hotel: HotelTourismInfo = { "ID": "C4_315080000H_000045", "Name": "洛碁大飯店忠孝館", "Description": "台北，國際交流的重要驛站，沈澱了各種文化基因，充滿了自由人文氣息，像是手上的咖啡，醇厚的令人嚮往。洛碁大飯店，第一個在台北市創立的大型連鎖飯店品牌，在捷運旁、熱鬧的西門町、台北車站、金融商圈等地，都能找到洛碁大飯店。堅持以平實的價格、多元的選擇及貼心的服務，提供每位旅客充電與休憩的地方，不論是您有意的安排或者偶然的巧遇，我們都期待您的來訪，一起在這美麗而多變的土地寫下屬於您的台北故事。", "Address": "臺北市大安區忠孝東路四段180號1樓、4樓至14樓", "ZipCode": "106", "Phone": "886-2-27116869", "Fax": "886-2-27115518", "WebsiteUrl": "http://zhongxiao.greenworldhotels.com", "Picture": { "PictureUrl1": "https://taiwan.taiwanstay.net.tw/twpic/92202.jpg", "PictureDescription1": "標準雙床房(無窗)－無障礙空間", "PictureUrl2": "https://taiwan.taiwanstay.net.tw/twpic/92203.jpg", "PictureDescription2": "標準雙床房(無窗)－無障礙空間-浴室", "PictureUrl3": "https://taiwan.taiwanstay.net.tw/twpic/92375.jpg" }, "Position": { "PositionLon": 121.54277038574219, "PositionLat": 25.041255950927734, "GeoHash": "wsqqmy8ez" }, "Class": "一般旅館", "Spec": "雙人房10000;單人房10000;單人房(無障礙客房) 7500;雙人房10000;", "ServiceInfo": "餐廳,會議場所,無線網路,國民旅遊卡,停車場,無障礙 <br>客房,自助洗衣 <br>(收費),上網電腦 <br>(免費),,,,洗衣服務,郵電服務,貴重物品保管專櫃,接送服務,AED,外幣兌換,自行車友善旅宿,,", "ParkingInfo": "車位:小客車35輛、機車0輛、大客車0輛", "City": "臺北市", "SrcUpdateTime": "2021-11-11T01:14:03+08:00", "UpdateTime": "2021-11-11T02:10:14+08:00" }
  bus = '北投竹子湖線';

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

  searchCityRestaurant(city: string, $top = 30, $skip = 0): Observable<RestaurantTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${city}?${params}&$format=JSON`;
    return this.get(url);
  }

  searchCityHotel(city: string, $top = 30, $skip = 0): Observable<HotelTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/${city}?${params}&$format=JSON`;
    return this.get(url);
  }

  searchTaiwanTrip($top = 30, $skip = 0): Observable<BusA1Data[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Bus/RealTimeByFrequency/TaiwanTrip?${params}&$format=JSON
    `;
    return this.get(url);
  }

  fetchFavoriateAttraction($top = 30, $skip = 0): Observable<ScenicSpotTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?${params}&$format=JSON`;
    return this.get(url);
  }

  fetchFavoriateRestaurant($top = 30, $skip = 0): Observable<RestaurantTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?${params}&$format=JSON`;
    return this.get(url);
  }

  fetchFavoriateHotel($top = 30, $skip = 0): Observable<HotelTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?${params}&$format=JSON`;
    return this.get(url);
  }

  fetchFavoriateTrip($top = 30, $skip = 0): Observable<BusA1Data[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Bus/RealTimeByFrequency/TaiwanTrip?${params}&$format=JSON
    `;
    return this.get(url);
  }
}