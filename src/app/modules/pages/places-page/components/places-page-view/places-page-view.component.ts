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

  private perPage = this.placesService.getPerPage();
  public page = 1;

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

  public updateFilterState(filterState): void {
    this.typesId = filterState;
    this.updatePlaces();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params.categoryId;
    });
    this.updatePlaces();
  }

}
