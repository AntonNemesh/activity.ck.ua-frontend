import { Component, OnInit } from '@angular/core';
import {DateService, UsersService} from '../../../../../services';
import { IEvent, IPlace } from '../../../../../static/type';

@Component({
  selector: 'app-page-user-view',
  templateUrl: './page-user-view.component.html',
  styleUrls: ['./page-user-view.component.css']
})
export class PageUserViewComponent implements OnInit {

  constructor(private usersService: UsersService, public dateService: DateService) { }

  public visitedPlaces: IPlace[];
  public favoritePlaces: IPlace[];
  public userPlaces: IPlace[];
  public userEvents: IEvent[];
  public scheduledEvents: IEvent[];

  public visitedPlacesPage: number = 1;
  public favoritePlacesPage: number = 1;
  public userPlacesPage: number = 1;
  public userEventsPage: number = 1;
  public scheduledEventsPage: number = 1;

  public visitedPlacesTotalPages: number;
  public favoritePlacesTotalPages: number;
  public userPlacesTotalPages: number;
  public userEventsTotalPages: number;
  public scheduledEventsTotalPages: number;

  public limit: number = 4;

  public updateEvents(section: string = 'all'): void {
    if (section === 'all') {
      this.usersService.getVisitedPlaces(this.visitedPlacesPage, this.limit).subscribe(
        (data) => {
          this.visitedPlacesTotalPages = data._totalPages;
          this.visitedPlaces = data.places;
        }
      );
      this.usersService.getFavoritePlaces(this.favoritePlacesPage, this.limit).subscribe(
        (data) => {
          this.favoritePlacesTotalPages = data._totalPages;
          this.favoritePlaces = data.places;
        }
      );
      this.usersService.getCreatedPlaces(this.userPlacesPage, this.limit).subscribe(
        (data) => {
          this.userPlacesTotalPages = data._totalPages;
          this.userPlaces = data.places;
        }
      );
      this.usersService.getCreatedEvents(this.userEventsPage, this.limit).subscribe(
        (data) => {
          this.userEventsTotalPages = data._totalPages;
          this.userEvents = data.events;
        }
      );
      this.usersService.getScheduledEvents(this.scheduledEventsPage, this.limit).subscribe(
        (data) => {
          this.scheduledEventsTotalPages = data._totalPages;
          this.scheduledEvents = data.events;
        }
      );
    }
    if (section === 'visited places') {
      this.usersService.getVisitedPlaces(this.visitedPlacesPage, this.limit).subscribe(
        (data) => {
          this.visitedPlacesTotalPages = data._totalPages;
          this.visitedPlaces = data.places;
        });
    }
    if (section === 'favorite places') {
      this.usersService.getFavoritePlaces(this.favoritePlacesPage, this.limit).subscribe(
        (data) => {
          this.favoritePlacesTotalPages = data._totalPages;
          this.favoritePlaces = data.places;
        }
      );
    }
    if (section === 'created places') {
      this.usersService.getCreatedPlaces(this.userPlacesPage, this.limit).subscribe(
        (data) => {
          this.userPlacesTotalPages = data._totalPages;
          this.userPlaces = data.places;
        }
      );
    }
    if (section === 'created events') {
      this.usersService.getCreatedEvents(this.userEventsPage, this.limit).subscribe(
        (data) => {
          this.userEventsTotalPages = data._totalPages;
          this.userEvents = data.events;
        }
      );
    }
    if (section === 'scheduled events') {
      this.usersService.getScheduledEvents(this.scheduledEventsPage, this.limit).subscribe(
        (data) => {
          this.scheduledEventsTotalPages = data._totalPages;
          this.scheduledEvents = data.events;
        }
      );
    }
  }

  public updateVisitedPlacesPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.visitedPlacesPage = page;
    this.updateEvents('visited places');
  }

  public updateFavoritePlacesPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.favoritePlacesPage = page;
    this.updateEvents('favorite places');
  }

  public updateUserPlacesPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.userPlacesPage = page;
    this.updateEvents('created places');
  }

  public updateUserEventsPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.userEventsPage = page;
    this.updateEvents('created events');
  }

  public updateScheduledEventsPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.scheduledEventsPage = page;
    this.updateEvents('scheduled events');
  }

  ngOnInit(): void {
    this.updateEvents();
  }
}
