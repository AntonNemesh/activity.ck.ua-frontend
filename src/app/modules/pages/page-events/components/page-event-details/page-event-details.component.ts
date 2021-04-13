import { Component, OnInit } from '@angular/core';
import { IEvent, IPhotos } from '../../../../../static/type';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../../services';

@Component({
  selector: 'app-page-event-details',
  templateUrl: './page-event-details.component.html',
  styleUrls: ['./page-event-details.component.css']
})
export class PageEventDetailsComponent implements OnInit {
  public eventId: string;
  public event: IEvent;
  public eventPhotos: IPhotos[];

  constructor(private route: ActivatedRoute, private eventsService: EventsService) { }

  getEvent(): void {
    this.eventsService.getEventById(this.eventId).subscribe((data) => {
      this.event = data.event;
      this.eventPhotos = data.photos;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventId = params.event_id;
    });
    this.getEvent();
  }
}
