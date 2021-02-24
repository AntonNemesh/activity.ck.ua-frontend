import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsOfPlaceService } from '../../../../../services/details-of-place.service';
import { IDetailsOfPlace, IPhotos } from '../../../../../static/type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details-of-place-page',
  templateUrl: './details-of-place-page.component.html',
  styleUrls: ['./details-of-place-page.component.css']
})
export class DetailsOfPlacePageComponent implements OnInit {
  public placeId: string;
  public name: string;
  public categoryId: string;
  public typeId: string;
  public photos: IPhotos[];
  public address: string;
  public phone: string;
  public website: string;
  public workTime: string;
  public accessibility: boolean;
  public dogFriendly: boolean;
  public childFriendly: boolean;
  public description: string;
  public rating: number;

  constructor(private route: ActivatedRoute, private detailsOfPlacesService: DetailsOfPlaceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.placeId = params.place_id;
    });
    this.detailsOfPlacesService.getDetailsOfPlace(this.placeId).pipe(
      map(((detailsOfPlace: IDetailsOfPlace) => (detailsOfPlace[0]))
      )).subscribe(detailsOfPlace => {
      this.photos = detailsOfPlace.photos;
      this.name = detailsOfPlace.name;
      this.typeId = detailsOfPlace.type_id;
      this.categoryId = detailsOfPlace.category_id;
      this.phone = detailsOfPlace.phone;
      this.address = detailsOfPlace.address;
      this.website = detailsOfPlace.website;
      this.workTime = detailsOfPlace.work_time;
      this.accessibility = detailsOfPlace.accessibility;
      this.dogFriendly = detailsOfPlace.dog_friendly;
      this.childFriendly = detailsOfPlace.child_friendly;
      this.description = detailsOfPlace.description;
      this.rating = detailsOfPlace.rating;
      console.log(this.photos);
    });

  }
}
