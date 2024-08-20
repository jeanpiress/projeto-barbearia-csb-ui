import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatoDataService {

  constructor() { }

  formatDate(date: Date): string {
    const timezoneOffset = -date.getTimezoneOffset();
    const sign = timezoneOffset >= 0 ? '+' : '-';
    const pad = (n: number) => n < 10 ? '0' + n : n;

    const formattedDate = date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      sign + pad(Math.floor(Math.abs(timezoneOffset) / 60)) +
      ':' + pad(Math.abs(timezoneOffset) % 60);

    return formattedDate;
  }

  public formatDateWithTime(dateStr: string, time: string): string {
    const date = new Date(dateStr);
    const pad = (n: number) => n < 10 ? '0' + n : n;

    const formattedDate = date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate() + 1) +
      'T' + time +
      '-03:00';

    return formattedDate;
  }
}
