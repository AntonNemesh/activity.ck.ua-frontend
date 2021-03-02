import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../../../../services';
import { IPlace } from '../../../../../static/type';


@Component({
  selector: 'app-page-place-details',
  templateUrl: './page-place-details.component.html',
  styleUrls: ['./page-place-details.component.css']
})
export class PagePlaceDetailsComponent implements OnInit {
  public placeId: string;
  public place: IPlace;

  constructor(private route: ActivatedRoute, private placesService: PlacesService) { }

  getPlace(): void {
    this.placesService.getPlaceById(this.placeId).subscribe((place) => {
      this.place = place;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.placeId = params.place_id;
    });
    this.getPlace();
  }
}
