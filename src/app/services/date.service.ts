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

  public getDateTime(dateString: Date|string): string {
    const date: Date = new Date(dateString);
    const options: any = { hour: 'numeric', minute: 'numeric', weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleString('uk-UK', options);
  }

  public getDateNumber(dateString: Date|string): string {
    const date: Date = new Date(dateString);
    const options: any = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleString('uk-UK', options);
  }

  public getShortNameOfMonth(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
  }

  public getUkrNameOfMonth(date: Date): string {
    return date.toLocaleString('uk-UK', { weekday: 'long' });
  }

  public getWorkState(workTime: IWorkTime): string {
    const date: Date = new Date();
    let weekday: string = this.getShortNameOfMonth(date);
    let conditionStartDay: boolean = false;
    let conditionEndDay: boolean = false;

    if (workTime[weekday]) {
      const startWorkDate: Date = new Date(
        date.getFullYear(), date.getMonth(), date.getDate(),
        workTime[weekday].start.split(':')[0], workTime[weekday].start.split(':')[1]
      );
      const endWorkDate: Date = new Date(
        date.getFullYear(), date.getMonth(), date.getDate(),
        workTime[weekday].end.split(':')[0], workTime[weekday].end.split(':')[1]
      );
      conditionStartDay = (+startWorkDate - +date) < 0;
      conditionEndDay = (+endWorkDate - +date) > 0;
    }

    if (conditionStartDay && conditionEndDay) {
      return `<span class="green">Відчинено</span> ${String.fromCharCode(0x0387)} Зачиняється: ${workTime[weekday].end}`;
    }

    if (!conditionStartDay && conditionEndDay) {
      return `<span class="red">Зачинено</span> ${String.fromCharCode(0x0387)} Відчиняється: ${workTime[weekday].start}`;
    }

    do {
      date.setDate(date.getDate() + 1);
      weekday = this.getShortNameOfMonth(date);
    } while (!workTime[weekday]);

    return `<span class="red">Зачинено</span> ${String.fromCharCode(0x0387)} Відчиняється: ${workTime[weekday].start}, ${this.getUkrNameOfMonth(date)}`;
  }
}
