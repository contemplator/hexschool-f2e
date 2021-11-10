
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

  searchCitySpot(city: string, $top = 30, $skip = 10): Observable<ScenicSpotTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?${params}&$format=JSON`;
    return this.get(url);
  }

}