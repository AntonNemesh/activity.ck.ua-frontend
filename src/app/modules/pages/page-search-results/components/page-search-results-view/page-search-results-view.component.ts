import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService, DateService } from '../../../../../services';
import {IEvent, IPlace} from '../../../../../static/type';
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

  public searchRequest: any;
  public events: IEvent[];
  public places: IPlace[];

  ngOnInit(): void {
    this.searchRequest = this.location.getState();
    if (!this.searchRequest.data) {
      this.router.navigateByUrl('home');
      return;
    }
    this.dataService.searchByText(this.searchRequest.data).subscribe((data) => {
      this.places = data.places.places;
      this.events = data.events.events;
    });
  }

}
