import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../../../../services';

@Component({
  selector: 'app-places-page-view',
  templateUrl: './places-page-view.component.html',
  styleUrls: ['./places-page-view.component.css']
})
export class PlacesPageViewComponent implements OnInit {
  public categoryId: string;
  public places: any;
  public filterTypeState: string[];
  public filterToleranceState: string[];

  private perPage;
  private page;

  constructor(private route: ActivatedRoute, private placesService: PlacesService) { }

  private updatePlaces(typeOfPagination?): void {
    let options;
    if (this.filterTypeState !== undefined && this.filterTypeState.length !== 0) {
      if (typeOfPagination === undefined || typeOfPagination === 'numb') {
        this.places.length = 0;
      }
      options = {
        type: this.filterTypeState[0],
        page: this.page,
        perPage: this.perPage
      };
    } else {
      options = {
        category: this.categoryId,
        page: this.page,
        perPage: this.perPage
      };
    }

    if (this.filterToleranceState !== undefined && this.filterToleranceState.length !== 0) {
      this.filterToleranceState.forEach((item: string) => {
        options[item] = true;
      });
    }

    this.placesService.getPlaces(options).subscribe((data: any) => {
      if (typeOfPagination === 'more') {
        this.places = this.places.concat(data);
        return;
      }
      this.places = data;
    });
  }

  private resetPage(): void {
    this.page = 1;
  }

  public updateFilterTypeState(filterState): void {
    this.filterTypeState = filterState;
    this.resetPage();
    this.updatePlaces();
  }

  public updateFilterToleranceState(filterState): void{
    this.filterToleranceState = filterState;
    this.resetPage();
    this.updatePlaces();
  }

  public updatePaginationState([page, typeOfPagination]): void {
    this.page = page;
    this.updatePlaces(typeOfPagination);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params.categoryId;
    });
    this.perPage = this.placesService.getPerPage();
    this.resetPage();
    this.updatePlaces();
  }

}
