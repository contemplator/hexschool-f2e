import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';
import * as moment from 'moment';
import { BikeStation, BikeAvailability, BikeShape, ScenicSpotTourismInfo, RestaurantTourismInfo } from '../../../viewmodels';

@Injectable({
  providedIn: 'root'
})
export class TdxService {
  appId = 'fcfb4ac781724b159db7fc6786ba7395';
  appKey = 'U6A4rgBSW8B5WYKjredCNnOaiCc';
  gmapKey = 'AIzaSyABCnBx0dgze3XWV51Ejp42sKWQjo64pco';
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

  fetchStationsByCity(city: string, $top = 30, $skip = 0): Observable<BikeStation[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}?${params}&$format=JSON`;
    return this.get(url);
  }

  fetchStationAvailablity(city: string, $top = 30, $skip = 0): Observable<BikeAvailability[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${city}?${params}&$format=JSON`;
    return this.get(url);
  }

  fetchCyclingShape(city: string, $top = 30, $skip = 0): Observable<BikeShape[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const url = `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${city}?${params}&$format=JSON`;
    return this.get(url);
  }

  fetchStationNearBy(lat: string, lng: string, range = 1000, $top = 30, $skip = 0): Observable<BikeStation[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const geoParam = `${lat}%2C${lng}%2C${range}`;
    const url = `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?${params}&$spatialFilter=nearby(${geoParam})&$format=JSON`;
    return this.get(url);
  }

  fetchStationAvailablityNearBy(lat: string, lng: string, range = 1000, $top = 30, $skip = 0): Observable<BikeAvailability[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const geoParam = `${lat}%2C${lng}%2C${range}`;
    const url = `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?${params}&$spatialFilter=nearby(${geoParam})&$format=JSON`;
    return this.get(url);
  }

  fetchAttractionNearBy(lat: number, lng: number, range = 1000, $top = 30, $skip = 0): Observable<ScenicSpotTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const geoParam = `${lat}%2C${lng}%2C${range}`;
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?${params}&$spatialFilter=nearby(${geoParam})&$format=JSON`;
    return this.get(url);
  }

  fetchRestaurantNearBy(lat: number, lng: number, range = 1000, $top = 30, $skip = 0): Observable<RestaurantTourismInfo[]> {
    const params = this.parsePureCharParams({ $top, $skip });
    const geoParam = `${lat}%2C${lng}%2C${range}`;
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?${params}&$spatialFilter=nearby(${geoParam})&$format=JSON`;
    return this.get(url);
  }

  getDirections(lat1: number, lon1: number, lat2: number, lon2: number): Observable<any> {
    const origin = encodeURI(`${lat1},${lon1}`);
    const destination = encodeURI(`${lat2},${lon2}`);
    const mode = 'bicycling';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${this.gmapKey}`;
    return this.http.get(url);
  }

}
