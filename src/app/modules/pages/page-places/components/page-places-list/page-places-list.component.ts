import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../../../../services';
import { IPlace } from '../../../../../static/type';
import { PlacesRequestParamsHelper } from '../../../../../helpers';

@Component({
  selector: 'app-page-places-list',
  templateUrl: './page-places-list.component.html',
  styleUrls: ['./page-places-list.component.css']
})
export class PagePlacesListComponent implements OnInit {
  private limit: number;
  private page: number;

  public categoryId: string;
  public places: IPlace[] = [];
  public filterTypeState: string[] = [];
  public filterToleranceState: string[] = [];

  constructor(private route: ActivatedRoute, private placesService: PlacesService) { }

  private updatePlaces(isConcatenation?: boolean): void {

    const options: PlacesRequestParamsHelper = new PlacesRequestParamsHelper(
      {
      page: this.page,
      limit: this.limit,
      categoryId: this.categoryId,
      filterTypeState: this.filterTypeState,
      filterToleranceState: this.filterToleranceState,
      }
    );

    this.placesService.getPlaces(options).subscribe((data) => {
      if (isConcatenation) {
        this.places = this.places.concat(data);
        return;
      }
      if (this.places?.length) { this.places.length = 0; }
      this.places = data;
    });
  }

  private resetPage(): void {
    this.page = 1;
  }

  public updateFilterTypeState(filterState: string[]): void {
    this.filterTypeState = filterState;
    this.resetPage();
    this.updatePlaces();
  }

  public updateFilterToleranceState(filterState: string[]): void{
    this.filterToleranceState = filterState;
    this.resetPage();
    this.updatePlaces();
  }

  public updatePaginationState([page, isConcatenation]: [number, boolean]): void {
    this.page = page;
    this.updatePlaces(isConcatenation);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params.category_id;
    });
    this.limit = this.placesService.getLimit();
    this.resetPage();
    this.updatePlaces();
  }

}
