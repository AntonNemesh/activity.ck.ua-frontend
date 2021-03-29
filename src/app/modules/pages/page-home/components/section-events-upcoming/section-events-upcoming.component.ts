import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../../services';
import { IEvent } from '../../../../../static/type';

@Component({
  selector: 'app-section-events-upcoming',
  templateUrl: './section-events-upcoming.component.html',
  styleUrls: ['./section-events-upcoming.component.css']
})
export class SectionEventsUpcomingComponent implements OnInit {
  public upcomingEvents: IEvent[];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsService.getEventsByDate().subscribe((events) => {
      this.upcomingEvents = events;
    });
  }

}
