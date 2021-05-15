import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService, DateService } from '../../../../../services';
import { IEvent, IPlace } from '../../../../../static/type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-search-results-view',
  templateUrl: './page-search-results-view.component.html',
  styleUrls: ['./page-search-results-view.component.css']
})
export class PageSearchResultsViewComponent implements OnInit {
  constructor(
    private location: Location,
    private dataService: DataService,
    private router: Router,
    public dateService: DateService) { }

  public searchText: any;
  public events: IEvent[];
  public places: IPlace[];

  public placesPage: number = 1;
  public eventsPage: number = 1;

  public limit: number = 3;

  public placesTotalPages: number;
  public eventsTotalPages: number;

  public updatePlaces(isConcatenation?: boolean): void {
    this.dataService.searchPlacesByText(this.searchText, this.placesPage, this.limit).subscribe((data) => {
      this.placesTotalPages = data._totalPages;
      if (isConcatenation) {
        this.places = this.places.concat(data.places);
        return;
      }
      if (this.places?.length) { this.places.length = 0; }
      this.places = data.places;
    });
  }

  public updateEvents(isConcatenation?: boolean): void {
    this.dataService.searchEventsByText(this.searchText, this.eventsPage, this.limit).subscribe((data) => {
      this.eventsTotalPages = data._totalPages;
      if (isConcatenation) {
        this.events = this.events.concat(data.events);
        return;
      }
      if (this.events?.length) { this.events.length = 0; }
      this.events = data.events;
    });
  }

  public updateAfterRedirect(): boolean {
    const dataRouter: any = this.location.getState();
    if (!dataRouter.data) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.searchText = dataRouter.data;
    this.updatePlaces();
    this.updateEvents();
  }

  public updatePlacesPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.placesPage = page;
    this.updatePlaces(isConcatenation);
  }

  public updateEventsPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.eventsPage = page;
    this.updateEvents(isConcatenation);
  }

  ngOnInit(): void {
    this.updateAfterRedirect();
    this.dataService.searchText().subscribe((searchText) => {
      this.searchText = searchText;
      this.updatePlaces();
      this.updateEvents();
    });
  }

}
