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
    const date: Date = new Date();
    let weekday: string = this.getShortNameOfMonth(date);
    let condition: boolean = false;

    if (workTime[weekday]) {
      const endWorkDate: Date = new Date(
        date.getFullYear(), date.getMonth(), date.getDate(),
        workTime[weekday].end.split(':')[0], workTime[weekday].end.split(':')[1]
      );
      condition = (+endWorkDate - +date) > 0;
    }

    if (condition) { return `Відчинено ${String.fromCharCode(0x0387)} Зачиняється: ${workTime[weekday].end}`; }

    do {
      date.setDate(date.getDate() + 1);
      weekday = this.getShortNameOfMonth(date);
    } while (!workTime[weekday]);

    return `Зачинено ${String.fromCharCode(0x0387)} Відчиняється: ${workTime[weekday].start}, ${this.getUkrFormat(date)}`;
  }
}
