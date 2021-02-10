import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DetailsOfPlaceService} from '../../../../../services/details-of-place.service';

@Component({
  selector: 'app-details-of-place-page',
  templateUrl: './details-of-place-page.component.html',
  styleUrls: ['./details-of-place-page.component.css']
})
export class DetailsOfPlacePageComponent implements OnInit {
  public placeId: string;
  public nameOfPlace: string;

  constructor(private route: ActivatedRoute, private detailsOfPlaces: DetailsOfPlaceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.placeId = params.idPlace;
    });
    this.detailsOfPlaces.getDetailsOfPlace(this.placeId).subscribe((

    ));
    console.log(this.nameOfPlace);
  }
}
