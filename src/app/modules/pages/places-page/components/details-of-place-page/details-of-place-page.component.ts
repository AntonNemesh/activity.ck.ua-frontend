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
  public detailOfPlace: IDetailsOfPlaceInterface;
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
      this.placeId = params.idPlace;
    });
    this.detailsOfPlaces.getDetailsOfPlace(this.placeId).subscribe(
      (detailsOfPlace: IDetailsOfPlaceInterface) => {
        this.detailsPhotos = detailsOfPlace[0][`photos`];
        this.nameOfPlace = detailsOfPlace[0][`name`];
        this.detailsPhone = detailsOfPlace[0][`phone`];
        this.detailAddress = detailsOfPlace[0][`address`];
        this.detailsWebSite = detailsOfPlace[0][`webSite`];
        this.detailsWorkTime = detailsOfPlace[0][`workTime`];
        this.detailsAccessibility = detailsOfPlace[0][`accessibility`];
        this.detailsDogFriendly = detailsOfPlace[0][`dogFriendly`];
        this.detailsChildFriendly = detailsOfPlace[0][`childFriendly`];
        this.detailsAboutInfo = detailsOfPlace[0][`aboutInfo`];
        this.detailsRating = detailsOfPlace[0][`rating`];
      });
  }
}
