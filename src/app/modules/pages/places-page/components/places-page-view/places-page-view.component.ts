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
  public typesId: string[];

  private perPage;
  private page;

  constructor(private route: ActivatedRoute, private placesService: PlacesService) { }

  private updatePlaces(): void {
    let options;
    if (this.typesId !== undefined && this.typesId.length !== 0) {
      this.places.length = 0;
      options = {
        type: this.typesId[0],
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

    this.placesService.getPlaces(options).subscribe((data: any) => { this.places = data; });
  }

  private resetPage(): void {
    this.page = 1;
  }

  public updateFilterState(filterState): void {
    this.typesId = filterState;
    this.resetPage();
    this.updatePlaces();
  }

  public updatePaginationState(page): void {
    this.page = page;
    this.updatePlaces();
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
