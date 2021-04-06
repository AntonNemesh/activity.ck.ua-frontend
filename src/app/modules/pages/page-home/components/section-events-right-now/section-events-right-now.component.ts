import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../../services';
import { IEvent } from '../../../../../static/type';

@Component({
  selector: 'app-section-events-right-now',
  templateUrl: './section-events-right-now.component.html',
  styleUrls: ['./section-events-right-now.component.css']
})
export class SectionEventsRightNowComponent implements OnInit {

  constructor(private eventsService: EventsService) { }

  public events: IEvent[];

  public page: number = 1;
  public limit: number = 3;
  public totalPages: number = 5;

  public updateEvents(): void {
    this.eventsService.getEventsNow(this.page, this.limit).subscribe((events) => {
      this.events = events;
    });
  }

  public updatePaginationState([page]: [number]): void {
    this.page = page;
    this.updateEvents();
  }

  ngOnInit(): void {
    this.updateEvents();
  }

}
