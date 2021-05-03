import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AVAILABILITY_FILTER} from '../../../../../static/data';
import {IAvailabilityFilter, IEvent} from '../../../../../static/type';
import {EventsService, FilesService} from '../../../../../services';

@Component({
  selector: 'app-page-event-add',
  templateUrl: './page-event-add.component.html',
  styleUrls: ['./page-event-add.component.css']
})
export class PageEventAddComponent implements OnInit {
  constructor(
    private filesService: FilesService,
    private eventsService: EventsService) {
  }

  public availabilityFilter: IAvailabilityFilter[] = AVAILABILITY_FILTER;
  public availabilityGroup: FormGroup = new FormGroup({});

  public photosGroupValidation: boolean = false;

  public photos: any[] = [];
  public photosUrl: string[] = [];
  public photoCover: number = 0;


  public googlePlacesOptions: any = {
    types: [],
    componentRestrictions: {
      country: 'UA',
    },
  };

  public photosGroup: FormGroup = new FormGroup({
    main_photo: new FormControl('', Validators.required),
    photos: new FormControl(null, Validators.required),
  });

  public EventForm: FormGroup = new FormGroup(
    {
      name: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]),
      organizer: new FormControl('',
        [
          Validators.minLength(3),
          Validators.maxLength(255)
        ]),
      price: new FormControl('',
        [
          Validators.required,
          Validators.maxLength(255)
        ]),
      website: new FormControl('',
        [
          Validators.minLength(3),
          Validators.maxLength(255)
        ]),
      address: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]),
      phone: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(13)
        ]),
      date: new FormControl('',
        [
          Validators.required,
        ]),
      start: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(13)
        ]),
      end: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(13)
        ]),
      program: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]),

      details: new FormControl('',
        [
          Validators.required,
          Validators.minLength(50),
        ]),

      accessibility: new FormControl('',
        [
          Validators.required,
          Validators.minLength(50),
        ]),

      child_friendly: new FormControl('',
        [
          Validators.required,
          Validators.minLength(50),
        ]),
      dog_friendly: new FormControl('',
        [
          Validators.required,
          Validators.minLength(50),
        ]),
    }
  );


  public handleAddressChange(address: any): void {
    this.EventForm.get('address').setValue(address.formatted_address);
  }

  // public setPhotosGroupValue(photosGroupState: string | null): void {
  //   this.photosGroup.get('photos').setValue(photosGroupState, {emitModelToViewChange: false});
  //   this.photosGroup.get('main_photo').setValue(photosGroupState);
  // }
  //
  // public setPhotos(photos: File[]): void {
  //   this.photos = photos;
  // }
  //
  // public setPhotoCover(index: number): void {
  //   this.photoCover = index;
  // }
  //
  // public updatePhotosGroupValidation(): void {
  //   this.photosGroupValidation = !this.photosGroupValidation;
  // }

  onSubmit(): void {

    if (this.EventForm.invalid) {
      console.log('invalid', this.EventForm);
      return;
    }
    const request: Partial<IEvent> = this.eventsService.buildRequest(this.EventForm.value);
    this.eventsService.saveEvent(request).subscribe(
      (data) => {
        console.log('success', data);
      },
      // (error) => {
      //   this.filesService.delete(this.photosUrl);
      //   console.log('oops', error);
      // }
    );

    console.log(
      `name ${this.EventForm.value.name},
        organizer ${this.EventForm.value.organizer},
        price ${this.EventForm.value.price},
        website ${this.EventForm.value.website},
        address ${this.EventForm.value.address},
        phone ${this.EventForm.value.phone},
        date ${this.EventForm.value.date},
        start ${this.EventForm.value.start},
        end ${this.EventForm.value.end},
        program ${this.EventForm.value.program},
        details ${this.EventForm.value.details},
        accessibility ${this.EventForm.value.accessibility},
        child_friendly ${this.EventForm.value.child_friendly},
        dog_friendly  ${this.EventForm.value.dog_friendly}
         `);
    // this.filesService.upload(this.photos).subscribe((urls) => {
    //   urls.forEach((url) => {
    //     this.photosUrl.push(url);
    //   });
    //   this.photosGroup.get('main_photo').setValue(this.photosUrl[this.photoCover]);
    // const request: Partial<IEvent> = this.eventsService.buildRequest(this.EventForm.value, this.photosUrl);
    // this.eventsService.saveEvent(request).subscribe(
    //   (data) => {
    //     this.httpErrorResponse = false;
    //     console.log('success', data);
    //   },
    //   (error) => {
    //     this.httpErrorResponse = true;
    //     this.filesService.delete(this.photosUrl);
    //     console.log('oops', error);
    //   }
    // );

  }

  ngOnInit(): void {
  }

}
