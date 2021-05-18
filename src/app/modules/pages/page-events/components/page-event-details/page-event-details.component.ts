import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../../../../static/type';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService, DateService, EventsService, UsersService } from '../../../../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-event-details',
  templateUrl: './page-event-details.component.html',
  styleUrls: ['./page-event-details.component.css']
})
export class PageEventDetailsComponent implements OnInit {
  public eventId: string;
  public event: IEvent;
  public scheduled: boolean;
  public isLoggedOut$: Observable<boolean> = this.authorizationService.isLoggedOut$;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private authorizationService: AuthorizationService,
    private usersService: UsersService,
    public dateService: DateService) { }

  getEvent(): void {
    this.eventsService.getEventById(this.eventId).subscribe((data) => {
      this.event = data.event;
      this.scheduled = data.event.scheduled;
    });
  }

  // public isScheduled(state: boolean): string {
  //   if (state === true) {
  //     return `<span class="pressed-primary-btn"> Відвідаю</span>`;
  //   }
  // }

  public updateScheduledState(): void {
    this.authorizationService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.eventsService.getEventById(this.eventId).subscribe((data) => {
          this.scheduled = data.event.scheduled;
          if (this.scheduled) {
            this.usersService.removeEventFromScheduled(this.eventId).subscribe();
            this.scheduled = !this.scheduled;
            return;
          }
          this.usersService.addEventToScheduled(this.eventId).subscribe();
          this.scheduled = !this.scheduled;
        });
      }
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventId = params.event_id;
    });
    this.getEvent();
    // this.isScheduled(this.scheduled);
  }
}
