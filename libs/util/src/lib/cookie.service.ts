import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  /**
   * 取得 key 為 name 的 cookie 值
   * @param name
   */
  getCookie(name: string): string {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiePairs = decodedCookie.split(';');
    for (let i = 0; i < cookiePairs.length; i++) {
      const pair = cookiePairs[i].trim().split('=');
      const key = pair[0];
      const value = pair[1];
      if (key === name) {
        return this.decode(value);
      }
    }

    return '';
  }

  setCookie(name: string, value: string): void {
    value = this.encode(value);
    document.cookie = `${name}=${value};`;
  }

  encode(str: string): string {
    return encodeURIComponent(str);
  }

  decode(str: string): string {
    return decodeURIComponent(str);
  }
}
