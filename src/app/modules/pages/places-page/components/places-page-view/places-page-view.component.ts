import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../../../../services';
import {IDetailsOfPlace} from '../../../../../static/type';

@Component({
  selector: 'app-places-page-view',
  templateUrl: './places-page-view.component.html',
  styleUrls: ['./places-page-view.component.css']
})
export class PlacesPageViewComponent implements OnInit {
  public categoryId: string;
  public places: IDetailsOfPlace[];
  public filterTypeState: string[];
  public filterToleranceState: string[];

  private perPage: number;
  private page: number;

  constructor(private route: ActivatedRoute, private placesService: PlacesService) { }

  private updatePlaces(typeOfPagination?): void {
    const params = {
      _page: this.page,
      _limit: this.perPage,
      category_id: undefined,
      type_id: undefined,
    };

    if (this.filterTypeState !== undefined && this.filterTypeState.length !== 0) {
      delete params.category_id;
      params.type_id = this.filterTypeState[0];
    } else {
      delete params.type_id;
      params.category_id = this.categoryId;
    }

    if (this.filterToleranceState !== undefined) {
      this.filterToleranceState.forEach((item: string) => {
        params[item] = true;
      });
    }

    this.placesService.getPlaces(params).subscribe((data: any) => {
      if (typeOfPagination === 'more') {
        this.places = this.places.concat(data);
        return;
      }
      if (this.places !== undefined) { this.places.length = 0; }
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
      this.categoryId = params.category_id;
    });
    this.perPage = this.placesService.getPerPage();
    this.resetPage();
    this.updatePlaces();
  }

}
