import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../../../../services';

@Component({
  selector: 'app-places-page-view',
  templateUrl: './places-page-view.component.html',
  styleUrls: ['./places-page-view.component.css']
})
export class PlacesPageViewComponent implements OnInit {
  public idCategory: string;
  public places: any;

  constructor(private route: ActivatedRoute, private placesService: PlacesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idCategory = params.idCategory;
    });
    this.placesService.getPlaces(this.idCategory).subscribe((data: any) => {
      this.places = data;
    });
  }

}
