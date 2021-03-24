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
  IPlaceForm,
  IPlacesCategories,
  IPlacesTypes,
  IToleranceFilter,
  IWeek,
  IWorkTime,
  IWorkTimeForm
} from '../../../../../static/type';
import { Router } from '@angular/router';
import { Observable, Subject} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MASK_PHONE, MASK_EMAIL, PATTERN_PHONE, WEEK, TOLERANCE_FILTER } from '../../../../../static/data';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FilesValidator } from '../../../../../validators';
import { LoaderHelper } from '../../../../../helpers';

@Component({
  selector: 'app-page-place-add',
  templateUrl: './page-place-add.component.html',
  styleUrls: ['./page-place-add.component.css']
})
export class PagePlaceAddComponent implements OnInit {
  public categories: IPlacesCategories[];
  public types: IPlacesTypes[] = [];
  public organizations: IOrganization[] = [];

  public filteredApprovedOrganizations: Observable<string[]>;
  public filteredProposedOrganizations: Observable<string[]>;

  public isNewOrganization: boolean = false;
  public isProposeOrganization: boolean = false;

  public maskPhone: Array<string|RegExp> = MASK_PHONE;
  public maskEmail: IMaskEmail = MASK_EMAIL;

  public week: IWeek[] = WEEK;
  public toleranceFilter: IToleranceFilter[] = TOLERANCE_FILTER;

  constructor(
    private placesService: PlacesService,
    private categoriesService: CategoriesService,
    private filterByTypeService: FilterByTypeService,
    private router: Router,
    private organizationsService: OrganizationsService,
    private filesService: FilesService) { }

  public organizationPhones: FormArray = new FormArray([this.phoneFormControl]);

  public placePhones: FormArray = new FormArray([this.phoneFormControl]);

  public proposeOrganization: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  public workTimeGroup: FormGroup = new FormGroup({});

  public organizationGroup: FormGroup = new FormGroup({
    organization_id: new FormControl(null, Validators.required),
  });

  public categoryGroup: FormGroup = new FormGroup({
    category_id: new FormControl('', Validators.required),
  });

  public mainGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    phones: this.placePhones,
  });

  public toleranceGroup: FormGroup = new FormGroup({});

  public photosGroup: FormGroup = new FormGroup({
    main_photo: new FormControl('', Validators.required),
    photos: new FormControl(null, Validators.required),
  });

  public hasErrorPhotosRequired: boolean = false;

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

  public photos: any[] = [];
  public photosB64: string[] = [];
  public photosUrl: any = [];
  public photoCover: number = 0;
  public photosLimit: number = 5;

  public messagesWarningOfType: string[];
  public messagesWarningOfSize: string[];
  public messagesWarningOfAmount: string[];

  public photosLoader: LoaderHelper = new LoaderHelper();
  public formLoader: LoaderHelper = new LoaderHelper();

  public photosLoaderVisible: Subject<boolean> = this.photosLoader.getLoaderState();
  public photosContentVisible: Subject<boolean> = this.photosLoader.getContentState();

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
    if (this.categoryGroup.get('type_id')) {
      this.categoryGroup.removeControl('type_id');
    }
    if (!types?.length) { return; }
    this.categoryGroup.addControl('type_id', new FormControl('', Validators.required));
    this.types = types;
  }

  private getOrganizationId(value: string): number {
    let result: number = -1;
    this.organizations.forEach((item) => {
      if (item.name === value) { result = item.id; }
    });
    return result;
  }

  private getOrganizationsNames(isApproved: boolean): string[] {
    const result: string[] = [];
    this.organizations.forEach((item) => {
      if (item.approved !== isApproved) { return; }
      result.push(item.name);
    });
    return result;
  }

  private filter(value: string, isApproved: boolean): string[] {
    if (value === null) { return; }
    const filterValue: string = value.toLowerCase();
    const result: string[] = this.getOrganizationsNames(isApproved);
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

  public updateErrorPhotosRequired(): void {
    this.hasErrorPhotosRequired = this.photos.length === 0;
  }

  public async selectFiles(event: any): Promise<any> {
    let selectFilesCounter: number = 0;
    const images: File[] = event.target.files;
    FilesValidator.resetFilesWarning();

    if (!images?.length || this.photosGroup.get('photos').invalid) { return; }

    this.hasErrorPhotosRequired = false;
    this.photosLoader.show();

    for (const image of images) {
      try {
        const imgValidator: FilesValidator = new FilesValidator(image);

        if (imgValidator.checkTypeOfFile()) {
          FilesValidator.setFileWarning('type', `"${image.name}"`);
          this.messagesWarningOfType = FilesValidator.getFilesWarning('type');
          continue;
        }

        if (imgValidator.checkSizeOfFile()) {
          FilesValidator.setFileWarning('size', `"${image.name}" - ${FilesValidator.formatBytes(image.size)}`);
          this.messagesWarningOfSize = FilesValidator.getFilesWarning('size');
          continue;
        }

        if (this.photos.length >= this.photosLimit) {
          FilesValidator.setFileWarning('amount', `"${image.name}"`);
          this.messagesWarningOfAmount = FilesValidator.getFilesWarning('amount');
          continue;
        }

        console.log(`select: ${++selectFilesCounter}`);

        const compressedFile: File = await this.filesService.compress(image);
        const compressedFileB64: string = await this.filesService.getBase64(compressedFile);

        if (!compressedFile || !compressedFileB64) { continue; }

        this.photos.push(compressedFile);
        this.photosB64.push(compressedFileB64);

      } catch (error) { console.log(error); }
    }
    if (this.photos?.length) { this.updateErrorPhotosRequired(); }
    this.photosGroup.get('photos').setValue('aa', { emitModelToViewChange: false });
    this.photosGroup.get('main_photo').setValue('aa');
    setTimeout(() => { this.photosLoader.hide(); }, 500);
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

  public buildWorkTime(workTime: IWorkTimeForm): IWorkTime {
    const result: IWorkTime = {};
    for (const key in workTime) {
      if (!workTime.hasOwnProperty(key) || workTime[key] === null) { continue; }
      const day: string = key.slice(0, 3);
      const limit: string = key.slice(4);
      if (!result.hasOwnProperty(day)) {
        result[day] = { [limit]: workTime[key] };
      } else {
        result[day][limit] = workTime[key];
      }
    }
    return result;
  }

  public buildRequest(value: IPlaceForm): Partial<IPlace> {
    const result: Partial<IPlace> = new Object({});

    if (value.hasOwnProperty('main_group')) {
      result.name = value.main_group.name;
      result.description = value.main_group.description;
      result.address = value.main_group.address;
      result.website = value.main_group.website;
      result.phones = value.main_group.phones;
    }

    result.photos = [];
    if (this.photosUrl?.length) {
      result.photos = this.photosUrl;
    }

    if (value.hasOwnProperty('photos_group')) {
      result.main_photo = value.photos_group.main_photo;
    }


    if (value.hasOwnProperty('tolerance_group')) {
      result.accessibility = value.tolerance_group.accessibility;
      result.child_friendly = value.tolerance_group.child_friendly;
      result.dog_friendly = value.tolerance_group.dog_friendly;
    }

    if (value.hasOwnProperty('work_time_group')) {
      result.work_time = this.buildWorkTime(value.work_time_group);
    }

    if (value.category_group.hasOwnProperty('category_id')) {
      result.category_id = value.category_group.category_id;
    }

    if (value.category_group.hasOwnProperty('type_id')) {
      result.type_id = value.category_group.type_id;
    }

    if (value.organization_group.hasOwnProperty('organization')) {
      if (value.organization_group.organization.hasOwnProperty('email')) {
        result.organization = value.organization_group.organization;
        return result;
      }
      result.organization_id = this.getOrganizationId(value.organization_group.organization.name);
      return result;
    }

    result.organization_id = this.getOrganizationId(value.organization_group.organization_id);
    return result;
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

  public selectCoverPhoto(index: number): void {
    this.photoCover = index;
  }

  public deletePhotoByIndex(index: number): void {
    this.photos.splice(index, 1);
    this.photosB64.splice(index, 1);
    this.photoCover = 0;
    FilesValidator.resetFilesWarning();
    this.updateErrorPhotosRequired();
    if (!this.photosUrl?.length) {
      this.photosGroup.get('photos').setValue(null);
      this.photosGroup.get('main_photo').setValue(null);
    }
  }

  public onSubmit(): void {
    this.updateErrorPhotosRequired();
    if (this.placeForm.invalid) {
      console.log('invalid', this.placeForm);
      return;
    }
    this.filesService.upload(this.photos).subscribe((urls) => {
      urls.forEach((url) => { this.photosUrl.push(url); });
      this.photosGroup.get('main_photo').setValue(this.photosUrl[this.photoCover]);
      this.updateErrorPhotosRequired();
      const request: Partial<IPlace> = this.buildRequest(this.placeForm.value);
      this.placesService.savePlace(request).subscribe((value2) => {
        // this.router.navigateByUrl(`/places/${value.category_id}`);
      });
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
