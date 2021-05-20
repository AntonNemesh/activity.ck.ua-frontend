import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FilterByTypeService,
  FilesService,
  EventsService,
  PlacesService
} from '../../../../../services';
import {
  IAvailabilityFilter,
  IEvent,
  IPlace
} from '../../../../../static/type';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MASK_PHONE, PATTERN_PHONE, AVAILABILITY_FILTER } from '../../../../../static/data';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { LoaderHelper } from '../../../../../helpers';



@Component({
  selector: 'app-page-event-create',
  templateUrl: './page-event-create.component.html',
  styleUrls: ['./page-event-create.component.css']
})
export class PageEventCreateComponent implements OnInit {
  constructor(
    private eventsService: EventsService,
    private placesService: PlacesService,
    private filterByTypeService: FilterByTypeService,
    private router: Router,
    private filesService: FilesService) { }

  public today: Date = new Date();
  public isSavedEvent: boolean = false;
  public httpErrorResponse: boolean = false;

  public places: IPlace[];

  public maskPhone: Array<string|RegExp> = MASK_PHONE;

  public availabilityFilter: IAvailabilityFilter[] = [];

  public phones: FormArray = new FormArray(
    [this.phoneFormControl]);

  public availabilityGroup: FormGroup = new FormGroup({});

  public scheduleGroup: FormGroup = new FormGroup({
    date: new FormControl(null, Validators.required),
    start_time: new FormControl(null, Validators.required),
    end_time: new FormControl(null, Validators.required)
  });

  public mainGroup: FormGroup = new FormGroup(
    {
      organizer: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]),
      name: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]),
      price: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[0-9]*[.]?[0-9]+$/)
        ]),
      description: new FormControl('',
        [
          Validators.required,
          Validators.minLength(20)
        ]),
      program: new FormControl('',
        [
          Validators.required,
          Validators.minLength(20)
        ]),
      address: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]),
      place_id: new FormControl(null),
      website: new FormControl('', Validators.required),
      phones: this.phones,
    });

  public photosGroup: FormGroup = new FormGroup({
    main_photo: new FormControl('', Validators.required),
    photos: new FormControl(null, Validators.required),
  });

  public eventForm: FormGroup = new FormGroup({
    photos_group: this.photosGroup,
    main_group: this.mainGroup,
    availability_group: this.availabilityGroup,
    schedule_group: this.scheduleGroup,
  });

  public googlePlacesOptions: any = {
    types: [],
    componentRestrictions: {
      country: 'UA',
    },
  };

  public photosGroupValidation: boolean = false;

  public photos: any[] = [];
  public photosUrl: string[] = [];
  public photoCover: number = 0;

  public formLoader: LoaderHelper = new LoaderHelper();
  public formLoaderVisibility: Observable<boolean> = this.formLoader.isVisibleLoader$;
  public formContentVisibility: Observable<boolean> = this.formLoader.isVisibleContent$;

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  private initFormControls(): void {
    AVAILABILITY_FILTER.forEach((item) => {
      if (item.filter_id === 'opened' || item.filter_id === 'unexplored') { return; }
      this.availabilityFilter.push(item);
      this.availabilityGroup.addControl(item.filter_id, new FormControl(false, Validators.required));
    });
  }

  private autocompleteData(): void {
    this.scheduleGroup.get('date').setValue(new Date('Tue May 15 2021 00:00:00 GMT+0300 (Eastern European Summer Time)'));
    this.scheduleGroup.get('start_time').setValue('08:00');
    this.scheduleGroup.get('end_time').setValue('21:00');
    this.mainGroup.get('name').setValue('Головна подія року');
    this.mainGroup.get('program').setValue('Програма на цей івєнт');
    this.mainGroup.get('price').setValue('145');
    this.mainGroup.get('organizer').setValue('Клуб кмітливих');
    this.mainGroup.get('description').setValue('Вам дуже сподобається ця подія, тому що там буде весело.');
    this.mainGroup.get('address').setValue('бул. Шевченко, 244, Черкассы, Черкасская область, 18000');
    this.mainGroup.get('website').setValue('http://fakesite.com');
    this.phones.controls[0].setValue('+380 (93) 256 65 45');
    this.availabilityGroup.get('child_friendly').setValue(true);
    this.photosGroup.get('main_photo').setValue('a');
  }

  public handleAddressChange(address: any): void {
    this.mainGroup.get('address').setValue(address.formatted_address);
    this.mainGroup.get('place_id').setValue(null);
    this.placesService.getPlacesByAddress(address.formatted_address).subscribe(
      (data) => { this.places = data.places; },
      (error) => { console.log('oops', error); }
    );
  }

  public get phoneFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.pattern(PATTERN_PHONE)
    ]);
  }

  public addPhone(event: Event): void {
    event.preventDefault();
    this.phones.push(this.phoneFormControl);
  }

  public deletePhone(index: number): void {
    this.phones.removeAt(index);
  }

  public setPhotosGroupValue(photosGroupState: string|null): void {
    this.photosGroup.get('photos').setValue(photosGroupState, { emitModelToViewChange: false });
    this.photosGroup.get('main_photo').setValue(photosGroupState);
  }

  public setPhotos(photos: File[]): void {
    this.photos = photos;
  }

  public setPhotoCover(index: number): void {
    this.photoCover = index;
  }

  public updatePhotosGroupValidation(): void {
    this.photosGroupValidation = !this.photosGroupValidation;
  }

  public onSubmit(): void {
    if (this.eventForm.invalid) {
      console.log('invalid', this.eventForm);
      return;
    }
    this.formLoader.show();
    this.filesService.upload(this.photos).pipe(
      finalize(() => {
        this.isSavedEvent = true;
        this.formLoader.hide();
      })
    ).subscribe((urls) => {
      urls.forEach((url) => { this.photosUrl.push(url); });
      this.photosGroup.get('main_photo').setValue(this.photosUrl[this.photoCover]);
      const request: Partial<IEvent> = this.eventsService.buildRequest(this.eventForm.value, this.photosUrl);
      this.eventsService.saveEvent(request).subscribe(
        (data) => {
          this.httpErrorResponse = false;
          console.log('success', data);
        },
        (error) => {
          this.httpErrorResponse = true;
          this.filesService.delete(this.photosUrl);
          console.log('oops', error);
        }
      );
    });
  }

  ngOnInit(): void {
    this.initFormControls();
    // this.autocompleteData();
  }
}
