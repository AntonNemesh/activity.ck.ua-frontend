import { Component, OnInit } from '@angular/core';
import { DateService, EventsService } from '../../../../../services';
import { IEvent } from '../../../../../static/type';

@Component({
  selector: 'app-section-events-right-now',
  templateUrl: './section-events-right-now.component.html',
  styleUrls: ['./section-events-right-now.component.css']
})
export class SectionEventsRightNowComponent implements OnInit {

  constructor(private eventsService: EventsService, public dateService: DateService) { }

  public events: IEvent[];

  public page: number = 1;
  public limit: number = 1;
  public totalPages: number;

  public updateEvents(): void {
    this.eventsService.getEventsNow(this.page, this.limit).subscribe((data) => {
      this.totalPages = data._totalPages;
      this.events = data.events;
    });
  }

  public updatePaginationState([page, isConcatenation]: [number, boolean]): void {
    this.page = page;
    this.updateEvents();
  }

  ngOnInit(): void {
    this.updateEvents();
  }

}
