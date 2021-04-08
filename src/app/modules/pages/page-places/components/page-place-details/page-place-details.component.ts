import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService, PlacesService } from '../../../../../services';
import { IEvent, IPlace } from '../../../../../static/type';


@Component({
  selector: 'app-page-place-details',
  templateUrl: './page-place-details.component.html',
  styleUrls: ['./page-place-details.component.css']
})
export class PagePlaceDetailsComponent implements OnInit {
  public placeId: string;
  public place: IPlace;
  public events: IEvent[];

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private eventsService: EventsService) { }

  private page: number = 1;
  private limit: number = 3;

  getPlace(): void {
    this.placesService.getPlaceById(this.placeId).subscribe((place) => {
      this.place = place;
    });
    this.eventsService.getEventsByPlaceId(this.placeId, this.page, this.limit).subscribe((data) => {
      this.events = data.events;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.placeId = params.place_id;
    });
    this.getPlace();
  }
}
