import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventsService } from '../../../../../services';
import { IEvent } from '../../../../../static/type';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-events-upcoming',
  templateUrl: './section-events-upcoming.component.html',
  styleUrls: ['./section-events-upcoming.component.css']
})
export class SectionEventsUpcomingComponent implements OnInit {
  constructor(private eventsService: EventsService) { }

  public events: IEvent[];
  public eventsFromDate: Observable<IEvent[]>;
  public dateToday: Date = new Date();
  public dateInput: FormControl = new FormControl('');
  public dateUrkFormat: string;
  public numbOfLoadedImages: number;

  public eventsLoaderVisible: boolean;

  public getDateUkrFormat(dateString: Date): string {
    const date: Date = new Date(dateString);
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('uk-UK', options);
  }

  public onLoad(): void {
    if (this.numbOfLoadedImages === this.events.length - 1) {
      this.numbOfLoadedImages = 0;
      setTimeout(() => { this.eventsLoaderVisible = false; }, 500);
      return;
    }
    this.numbOfLoadedImages++;
  }

  ngOnInit(): void {
    this.eventsLoaderVisible = true;
    this.numbOfLoadedImages = 0;
    this.dateToday.setHours(0, 0, 0, 0);
    this.dateUrkFormat = this.getDateUkrFormat(this.dateToday);
    this.eventsFromDate = this.dateInput.valueChanges.pipe(
      switchMap((date) => {
        this.eventsLoaderVisible = true;
        this.dateUrkFormat = this.getDateUkrFormat(date);
        return this.eventsService.getEventsFromDate(date.getTime());
      })
    );
    this.eventsFromDate.subscribe((events) => {
      this.events = events;
      if (this.events?.length) { return; }
      setTimeout(() => { this.eventsLoaderVisible = false; }, 500);
    });
    this.eventsService.getEventsFromDate(this.dateToday.getTime()).subscribe(
(events) => { this.events = events; }
    );
  }
}
