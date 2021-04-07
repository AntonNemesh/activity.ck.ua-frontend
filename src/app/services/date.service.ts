import { Injectable } from '@angular/core';
import { IWorkTime } from '../static/type';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public getUkrFormat(dateString: Date): string {
    const date: Date = new Date(dateString);
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('uk-UK', options);
  }

  public getShortNameOfMonth(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
  }

  public getWorkState(workTime: IWorkTime): string {
    let result: string;
    const date: Date = new Date();
    let weekday: string = this.getShortNameOfMonth(date);
    if (workTime[weekday]) {
      result = `Відчинено ${String.fromCharCode(0x0387)} Зачиняється: ${workTime[weekday].end}`;
    } else {
      while (!workTime[weekday]) {
        date.setDate(date.getDate() + 1);
        weekday = this.getShortNameOfMonth(date);
      }
      result = `Зачинено ${String.fromCharCode(0x0387)} Відчиняється: ${workTime[weekday].start}, ${this.getUkrFormat(date)}`;
    }
    return result;
  }
}
