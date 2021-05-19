import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService, CategoriesService, DateService, PlacesService } from '../../../../../services';
import { IPlace } from '../../../../../static/type';
import { PlacesRequestParamsHelper } from '../../../../../helpers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-places-list',
  templateUrl: './page-places-list.component.html',
  styleUrls: ['./page-places-list.component.css']
})
export class PagePlacesListComponent implements OnInit {
  private limit: number;
  private page: number;

  public categoryId: string;
  public categoryName: string;
  public places: Partial<IPlace[]>;
  public filterTypeState: string[] = [];
  public filterAvailabilityState: string[] = [];

  public totalPages: number;
  public totalPlaces: number;
  public isLoggedIn$: Observable<boolean> = this.authorizationService.isLoggedIn$;
  public isLoggedOut$: Observable<boolean> = this.authorizationService.isLoggedOut$;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private categoriesService: CategoriesService,
    private authorizationService: AuthorizationService,
    public dateService: DateService) { }

  private updatePlaces(isConcatenation?: boolean): void {

    const options: PlacesRequestParamsHelper = new PlacesRequestParamsHelper(
      this.page,
      this.limit,
      this.categoryId,
      this.filterTypeState,
      this.filterAvailabilityState
    );

    this.placesService.getPlaces(options).subscribe((data) => {
      this.totalPages = data._totalPages;
      this.totalPlaces = data._total;
      if (isConcatenation) {
        this.places = this.places.concat(data.places);
        return;
      }
      if (this.places?.length) { this.places.length = 0; }
      this.places = data.places;
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

  public updateFilterAvailabilityState(filterState: string[]): void{
    this.filterAvailabilityState = filterState;
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
      this.categoryName = this.categoriesService.getCategoryNameById(params.category_id);
    });
    this.limit = this.placesService.getLimit();
    this.resetPage();
    this.updatePlaces();
  }

}
