import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CategoriesService,
  FilterByTypeService,
  PlacesService,
  OrganizationsService, FilesService
} from '../../../../../services';
import {
  IMaskEmail,
  IOrganization,
  IPlace,
  IPlacesCategories,
  IPlacesTypes,
  IToleranceFilter,
  IWeek
} from '../../../../../static/type';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { MASK_PHONE, MASK_EMAIL, PATTERN_PHONE, WEEK, TOLERANCE_FILTER } from '../../../../../static/data';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { LoaderHelper } from '../../../../../helpers';

@Component({
  selector: 'app-page-place-add',
  templateUrl: './page-place-add.component.html',
  styleUrls: ['./page-place-add.component.css']
})
export class PagePlaceAddComponent implements OnInit {
  constructor(
    private placesService: PlacesService,
    private categoriesService: CategoriesService,
    private filterByTypeService: FilterByTypeService,
    private router: Router,
    private organizationsService: OrganizationsService,
    private filesService: FilesService) { }

  public categories: IPlacesCategories[];
  public types: IPlacesTypes[] = [];
  public organizations: IOrganization[] = [];

  public filteredApprovedOrganizations: Observable<string[]>;
  public filteredProposedOrganizations: Observable<string[]>;

  public isNewOrganization: boolean = false;
  public isProposeOrganization: boolean = false;
  public isSavedPlace: boolean = false;

  public maskPhone: Array<string|RegExp> = MASK_PHONE;
  public maskEmail: IMaskEmail = MASK_EMAIL;

  public week: IWeek[] = WEEK;
  public toleranceFilter: IToleranceFilter[] = TOLERANCE_FILTER;

  public organizationPhones: FormArray = new FormArray([this.phoneFormControl]);
  public placePhones: FormArray = new FormArray([this.phoneFormControl]);

  public proposeOrganization: FormGroup = new FormGroup({ name: new FormControl(null, Validators.required), });
  public organizationGroup: FormGroup = new FormGroup({ organization_id: new FormControl(null, Validators.required) });
  public categoryGroup: FormGroup = new FormGroup({ category_id: new FormControl('', Validators.required), });
  public toleranceGroup: FormGroup = new FormGroup({});
  public workTimeGroup: FormGroup = new FormGroup({});

  public mainGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    phones: this.placePhones,
  });

  public photosGroup: FormGroup = new FormGroup({
    main_photo: new FormControl('', Validators.required),
    photos: new FormControl(null, Validators.required),
  });

  public placeForm: FormGroup = new FormGroup({
    photos_group: this.photosGroup,
    main_group: this.mainGroup,
    tolerance_group: this.toleranceGroup,
    category_group: this.categoryGroup,
    organization_group: this.organizationGroup,
    work_time_group: this.workTimeGroup,
  });

  public googlePlacesOptions: any = {
    types: [],
    componentRestrictions: {
      country: 'UA',
    },
  };

  public photosGroupValidation: boolean = false;

  public photos: any[] = [];
  public photosUrl: any = [];
  public photoCover: number = 0;

  public formLoader: LoaderHelper = new LoaderHelper();
  public formLoaderVisible: Subject<boolean> = this.formLoader.getLoaderState();
  public formContentVisible: Subject<boolean> = this.formLoader.getContentState();

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  private initFormControls(): void {
    this.week.forEach((day) => {
      this.workTimeGroup.addControl(`${day.id}_start`, new FormControl(null, Validators.required));
      this.workTimeGroup.addControl(`${day.id}_end`, new FormControl(null, Validators.required));
    });
    this.toleranceFilter.forEach((item) => {
      this.toleranceGroup.addControl(item.filter_id, new FormControl(false, Validators.required));
    });
  }

  private setTypes(category: string): void {
    this.types.length = 0;
    const types: IPlacesTypes[] = this.filterByTypeService.getTypes(category);

    if (this.categoryGroup.get('type_id') && !types?.length) {
      this.categoryGroup.removeControl('type_id');
    }

    if (!types?.length) { return; }
    this.types = types;

    if (this.categoryGroup.get('type_id')) {
      this.categoryGroup.get('type_id').setValue(null);
    } else {
      this.categoryGroup.addControl('type_id', new FormControl('', Validators.required));
    }

  }

  private filter(value: string, isApproved: boolean): string[] {
    if (value === null) { return; }
    const filterValue: string = value.toLowerCase();
    const result: string[] = this.organizationsService.getOrganizationsNames(this.organizations, isApproved);
    return result.filter(option => option.toLowerCase().includes(filterValue));
  }

  private autocompleteData(): void {
    this.organizationGroup.get('organization_id').setValue('Федерація Альпинизму і Скелелазіння');
    this.categoryGroup.get('category_id').setValue('recreation');
    this.categoryGroup.get('type_id').setValue('water');
    this.mainGroup.get('name').setValue('Імя організіції');
    this.mainGroup.get('description').setValue('Опис організіції');
    this.mainGroup.get('address').setValue('бул. Шевченко, 244, Черкассы, Черкасская область, 18000');
    this.mainGroup.get('website').setValue('http://fakesite.com');
    this.placePhones.controls[0].setValue('+380 (93) 256 65 45');
    this.toleranceGroup.get('child_friendly').setValue(true);
    this.workTimeGroup.get('mon_start').setValue('8:00');
    this.workTimeGroup.get('mon_end').setValue('17:00');
    this.workTimeGroup.get('tue_start').setValue('8:00');
    this.workTimeGroup.get('tue_end').setValue('17:00');
    this.workTimeGroup.get('wed_start').setValue('8:00');
    this.workTimeGroup.get('wed_end').setValue('17:00');
    this.workTimeGroup.get('thu_start').setValue('8:00');
    this.workTimeGroup.get('thu_end').setValue('17:00');
    this.workTimeGroup.get('fri_start').setValue('8:00');
    this.workTimeGroup.get('fri_end').setValue('17:00');
    this.workTimeGroup.get('sat_start').setValue('8:00');
    this.workTimeGroup.get('sat_end').setValue('17:00');
    this.workTimeGroup.get('sun_start').setValue('8:00');
    this.workTimeGroup.get('sun_end').setValue('17:00');
    this.photosGroup.get('main_photo').setValue('aa');
  }

  public handleAddressChange(address: any): void {
    this.mainGroup.get('address').setValue(address.formatted_address);
  }

  public toggleDayOff(day: string): void {
    if (this.workTimeGroup.get(day + '_start').disabled ||
      this.workTimeGroup.get(day + '_end').disabled) {
      this.workTimeGroup.get(day + '_start').enable();
      this.workTimeGroup.get(day + '_end').enable();
    } else {
      this.workTimeGroup.get(day + '_start').disable();
      this.workTimeGroup.get(day + '_end').disable();
    }
  }

  public get phoneFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.pattern(PATTERN_PHONE)
    ]);
  }

  public addPhone(event: Event, isOrganization: boolean): void {
    event.preventDefault();
    if (isOrganization) {
      this.organizationPhones.push(this.phoneFormControl);
    } else {
      this.placePhones.push(this.phoneFormControl);
    }
  }

  public deletePhone(index: number, isOrganization: boolean): void {
    if (isOrganization) {
      this.organizationPhones.removeAt(index);
    } else {
      this.placePhones.removeAt(index);
    }
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
    if (this.placeForm.invalid) {
      console.log('invalid', this.placeForm);
      return;
    }
    this.formLoader.show();
    this.filesService.upload(this.photos).pipe(
      finalize(() => {
        this.isSavedPlace = true;
        this.formLoader.hide();
      })
    ).subscribe((urls) => {
      urls.forEach((url) => { this.photosUrl.push(url); });
      this.photosGroup.get('main_photo').setValue(this.photosUrl[this.photoCover]);
      const request: Partial<IPlace> = this.placesService.buildRequest(this.placeForm.value, this.photosUrl, this.organizations);
      this.placesService.savePlace(request).subscribe();
    });
  }

  ngOnInit(): void {
    this.initFormControls();
    this.categories = this.categoriesService.getCategories();

    this.organizationsService.getOrganizations().subscribe((organizations) => {
      this.organizations = organizations;

      this.filteredApprovedOrganizations = this.organizationGroup.get('organization_id').valueChanges
        .pipe(
          startWith(''),
          map((value) => {
            const result: string[] = this.filter(value, true);
            if (!result?.length) {
              this.organizationGroup.addControl('organization', this.proposeOrganization);
              this.isNewOrganization = true;
            } else {
              this.isNewOrganization = false;
              this.organizationGroup.removeControl('organization');
              this.proposeOrganization.reset();
            }
            return result;
          }),
        );

      this.filteredProposedOrganizations = this.proposeOrganization.get('name').valueChanges
        .pipe(
          startWith(''),
          map((value) => {
            const result: string[] = this.filter(value, false);
            if (!result?.length) {
              this.proposeOrganization.addControl('phones', this.organizationPhones);
              this.proposeOrganization.addControl('email', new FormControl(null, [
                Validators.required,
                Validators.email
              ]));
              this.organizationPhones.clear();
              this.organizationPhones.push(this.phoneFormControl);
              this.isProposeOrganization = true;
            } else {
              this.isProposeOrganization = false;
              this.proposeOrganization.removeControl('phones');
              this.proposeOrganization.removeControl('email');
            }
            return result;
          }),
        );
    });

    this.categoryGroup.get('category_id').valueChanges.subscribe((value) => {
      this.setTypes(value);
    });

    this.autocompleteData();
  }
}
