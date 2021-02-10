import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DetailsOfPlaceService} from '../../../../../services/details-of-place.service';
import {IDetailsOfPlaceInterface} from '../../../../../static/type';

@Component({
  selector: 'app-details-of-place-page',
  templateUrl: './details-of-place-page.component.html',
  styleUrls: ['./details-of-place-page.component.css']
})
export class DetailsOfPlacePageComponent implements OnInit {
  public placeId: string;
  public nameOfPlace: string;
  public detailsPlaceId: number;
  public detailsCategoryId: string;
  public detailsPhotos: Array<string>;
  public detailsName: string;
  public detailAddress: string;
  public detailsPhone: string;
  public detailsWebSite: string;
  public detailsWorkTime: string;
  public detailsAccessibility: boolean;
  public detailsDogFriendly: boolean;
  public detailsChildFriendly: boolean;
  public detailsAboutInfo: string;
  public detailsRating: number;

  constructor(private route: ActivatedRoute, private detailsOfPlaces: DetailsOfPlaceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.placeId = params.idPlace;
    });
    this.detailsOfPlaces.getDetailsOfPlace(this.placeId).subscribe(
      (detailsOfPlace: IDetailsOfPlaceInterface) => {
        this.detailsPhotos = detailsOfPlace.photos;
        this.nameOfPlace = detailsOfPlace.name;
        this.detailsPhone = detailsOfPlace.phone;
        this.detailAddress = detailsOfPlace.address;
        this.detailsWebSite = detailsOfPlace.webSite;
        this.detailsWorkTime = detailsOfPlace.workTime;
        this.detailsAccessibility = detailsOfPlace.accessibility;
        this.detailsDogFriendly = detailsOfPlace.dogFriendly;
        this.detailsChildFriendly = detailsOfPlace.childFriendly;
        this.detailsAboutInfo = detailsOfPlace.aboutInfo;
        this.detailsRating = detailsOfPlace.rating;
      });
    console.log('this.this.placeId', this.nameOfPlace);
  }
}
