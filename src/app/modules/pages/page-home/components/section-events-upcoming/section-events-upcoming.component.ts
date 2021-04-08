import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventsService } from '../../../../../services';
import {IEvent, IEventsResponse} from '../../../../../static/type';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoaderHelper } from '../../../../../helpers';

@Component({
  selector: 'app-section-events-upcoming',
  templateUrl: './section-events-upcoming.component.html',
  styleUrls: ['./section-events-upcoming.component.css']
})
export class SectionEventsUpcomingComponent implements OnInit {
  constructor(private eventsService: EventsService) { }

  public events: IEvent[];
  public eventsFromDate: Observable<IEventsResponse>;
  public dateToday: Date = new Date();
  public dateInput: FormControl = new FormControl('');
  public dateUrkFormat: string;
  public numbOfLoadedImages: number;

  public eventsLoader: LoaderHelper = new LoaderHelper();
  public eventsLoaderVisibility: Observable<boolean> = this.eventsLoader.isVisibleLoader$;
  public eventsContentVisibility: Observable<boolean> = this.eventsLoader.isVisibleContent$;

  public getDateUkrFormat(dateString: Date): string {
    const date: Date = new Date(dateString);
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('uk-UK', options);
  }

  ngOnInit(): void {
    this.eventsLoader.show();
    this.numbOfLoadedImages = 0;
    this.dateToday.setHours(0, 0, 0, 0);
    this.dateUrkFormat = this.getDateUkrFormat(this.dateToday);
    this.eventsFromDate = this.dateInput.valueChanges.pipe(
      switchMap((date) => {
        this.eventsLoader.show();
        this.dateUrkFormat = this.getDateUkrFormat(date);
        return this.eventsService.getEventsFromDate(date.getTime());
      })
    );
    this.eventsFromDate.pipe(debounceTime(500)).subscribe((data) => {
      this.events = data.events;
      this.eventsLoader.hide();
    });
    this.eventsService.getEventsFromDate(this.dateToday.getTime()).subscribe(
(data) => {
        this.events = data.events;
        this.eventsLoader.hide();
      }
    );
  }
}
