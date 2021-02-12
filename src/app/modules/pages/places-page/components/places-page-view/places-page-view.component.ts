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

  constructor(private route: ActivatedRoute, private placesService: PlacesService) { }

  private updatePlaces(): void {
    if (this.typesId === undefined) {
      this.placesService.getPlaces(this.categoryId, 1, 50).subscribe((data: any) => {
        this.places = data;
      });
      return;
    }
    if (this.typesId.length !== 0) {
      this.places.length = 0;
      this.placesService.getPlaces('', 1, 50, this.typesId[0]).subscribe((data: any) => {
        this.places = data;
      });
    } else {
      this.places.length = 0;
      this.placesService.getPlaces(this.categoryId, 1, 50).subscribe((data: any) => {
        this.places = data;
      });
    }
  }

  public setFilterState(filterState): void {
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
