import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateService, EventsService } from '../../../../../services';
import { IEvent } from '../../../../../static/type';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoaderHelper } from '../../../../../helpers';

@Component({
  selector: 'app-section-events-upcoming',
  templateUrl: './section-events-upcoming.component.html',
  styleUrls: ['./section-events-upcoming.component.css']
})
export class SectionEventsUpcomingComponent implements OnInit {

  constructor(private eventsService: EventsService, private dateService: DateService) { }

  public events: IEvent[];
  public eventsFromDate: Observable<IEvent[]>;
  public dateToday: Date = new Date();
  public dateInput: FormControl = new FormControl('');
  public dateUrkFormat: string;
  public numbOfLoadedImages: number;

  public eventsLoader: LoaderHelper = new LoaderHelper();
  public eventsLoaderVisibility: Observable<boolean> = this.eventsLoader.isVisibleLoader$;
  public eventsContentVisibility: Observable<boolean> = this.eventsLoader.isVisibleContent$;

  ngOnInit(): void {
    this.eventsLoader.show();
    this.numbOfLoadedImages = 0;
    this.dateToday.setHours(0, 0, 0, 0);
    this.dateUrkFormat = this.dateService.getUkrFormat(this.dateToday);
    this.eventsFromDate = this.dateInput.valueChanges.pipe(
      switchMap((date) => {
        this.eventsLoader.show();
        this.dateUrkFormat = this.dateService.getUkrFormat(date);
        return this.eventsService.getEventsFromDate(date.getTime());
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
