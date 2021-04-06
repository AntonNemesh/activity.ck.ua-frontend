import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../../services';
import { IEvent } from '../../../../../static/type';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-page-events-list',
  templateUrl: './page-events-list.component.html',
  styleUrls: ['./page-events-list.component.css']
})
export class PageEventsListComponent implements OnInit {
  constructor(private eventsService: EventsService) { }

  public events: IEvent[];
  public dateToday: Date = new Date();
  public dateInput: FormControl = new FormControl('');
  public dateUrkFormat: string;
  public date: Date = this.dateToday;
  public numbOfLoadedImages: number;

  public page: number = 1;
  public limit: number = 1;
  public totalPages: number = 5;

  public getDateUkrFormat(dateString: Date): string {
    const date: Date = new Date(dateString);
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('uk-UK', options);
  }

  public updateEvents(isConcatenation?: boolean): void {
    this.eventsService.getEventsFromDate(this.date.getTime(), this.page, this.limit).subscribe((events) => {
      if (isConcatenation) {
        this.events = this.events.concat(events);
        return;
      }
      if (this.events?.length) { this.events.length = 0; }
      this.events = events;
    });
  }

  public updatePaginationState([page, isConcatenation]: [number, boolean]): void {
    this.page = page;
    this.updateEvents(isConcatenation);
  }

  ngOnInit(): void {
    this.numbOfLoadedImages = 0;
    this.dateToday.setHours(0, 0, 0, 0);
    this.dateUrkFormat = this.getDateUkrFormat(this.dateToday);

    this.dateInput.valueChanges.subscribe((date) => {
      this.dateUrkFormat = this.getDateUkrFormat(date);
      this.date = date;
      this.page = 1;
      this.updateEvents();
    });

    this.updateEvents();
  }
}
