import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../../services';
import { IEvent } from '../../../../../static/type';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LoaderHelper } from '../../../../../helpers';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-events-list',
  templateUrl: './page-events-list.component.html',
  styleUrls: ['./page-events-list.component.css']
})
export class PageEventsListComponent implements OnInit {
  constructor(private eventsService: EventsService) { }

  public events: IEvent[];
  public eventsFromDate: Observable<IEvent[]>;
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
        return this.eventsService.getEventsFromDate(date.getTime(), 1, 100);
      })
    );
    this.eventsFromDate.pipe(debounceTime(500)).subscribe((events) => {
      this.events = events;
      this.eventsLoader.hide();
    });
    this.eventsService.getEventsFromDate(this.dateToday.getTime()).subscribe(
      (events) => {
        this.events = events;
        this.eventsLoader.hide();
      }
    );
  }
}
