import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CategoriesService,
  FilterByTypeService,
  PlacesService,
  OrganizationsService,
  LoaderService
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
import {Observable, Subject} from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { MASK_PHONE, MASK_EMAIL, PATTERN_PHONE, WEEK, TOLERANCE_FILTER } from '../../../../../static/data';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { FilesValidator } from '../../../../../validators';
import imageCompression from 'browser-image-compression';
import {MatStepper} from '@angular/material/stepper';

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
    private angularFireStorage: AngularFireStorage,
    private loaderService: LoaderService) { }

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

  public loaderVisible: Subject<boolean> = this.loaderService.loaderVisible;
  public contentVisible: Subject<boolean> = this.loaderService.contentVisible;

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
      console.log('removed type_id', this.categoryGroup.status);
    }

    if (!types?.length) { return; }
    this.categoryGroup.addControl('type_id', new FormControl('', Validators.required));
    console.log('added type_id', this.categoryGroup.status);
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

  private async uploadFiles(): Promise<any> {
    let uploadFilesCounter: number = 0;

    for (const photo of this.photos) {
      try {
        console.log(`upload: ${++uploadFilesCounter}`);

        const filePath: string = 'images/' + Math.random() + photo.name;
        const fileRef: AngularFireStorageReference = this.angularFireStorage.ref(filePath);

        this.angularFireStorage.upload(filePath, photo).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.photosUrl.push(url);
              this.photosGroup.get('main_photo').setValue(this.photosUrl[this.photoCover]);
              this.updateErrorPhotosRequired();
            });
          }),
        ).subscribe();
      } catch (error) { console.log(error); }
    }
  }

  public updateErrorPhotosRequired(): void {
    this.hasErrorPhotosRequired = this.photos.length === 0;
  }

  public async compressFile(image: File): Promise<File> {
    const options: any = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };
    try {
      const compressedFile: any = await imageCompression(image, options);
      console.log(
        `%c Original: ${FilesValidator.formatBytes(image.size)}` +
        '%c =>' +
        `%c Compressed: ${FilesValidator.formatBytes(compressedFile.size)}`,
        'color:blue;', 'color:black;', 'color:green;'
      );
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  }

  public async selectFiles(event: any): Promise<any> {
    let selectFilesCounter: number = 0;
    const images: File[] = event.target.files;
    FilesValidator.resetFilesWarning();

    if (!images?.length || this.photosGroup.get('photos').invalid) { return; }

    this.hasErrorPhotosRequired = false;
    this.loaderService.show();

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

        const compressedFile: File = await this.compressFile(image);
        const compressedFileB64: string = await imageCompression.getDataUrlFromFile(compressedFile);

        if (!compressedFile || !compressedFileB64) { continue; }

        this.photos.push(compressedFile);
        this.photosB64.push(compressedFileB64);

      } catch (error) { console.log(error); }
    }
    if (this.photos?.length) { this.updateErrorPhotosRequired(); }
    this.photosGroup.get('photos').setValue(' ', { emitModelToViewChange: false });
    this.photosGroup.get('main_photo').setValue(' ');
    setTimeout(() => { this.loaderService.hide(); }, 500);
  }

  public superReset(stepper: MatStepper): void {
    if (this.mainGroup) { this.mainGroup.reset(); }
    if (this.organizationGroup) { this.organizationGroup.reset(); }
    if (this.workTimeGroup) { this.workTimeGroup.reset(); }
    if (this.toleranceGroup) { this.toleranceGroup.reset(); }
    if (this.categoryGroup) { this.categoryGroup.reset(); }
    if (this.photosGroup) { this.photosGroup.reset(); }
    if (this.placeForm) { this.placeForm.reset(); }
    if (stepper) { stepper.reset(); }
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

  public buildRequest(value: any): any {
    const result: any = new Object({});

    if (value.hasOwnProperty('main_group')) {
      result.name = value.main_group.name;
      result.description = value.main_group.description;
      result.address = value.main_group.address;
      result.website = value.main_group.website;
      result.phones = value.main_group.phones;
    }

    if (value.hasOwnProperty('tolerance_group')) {
      result.accessibility = value.tolerance_group.accessibility;
      result.child_friendly = value.tolerance_group.child_friendly;
      result.dog_friendly = value.tolerance_group.dog_friendly;
    }

    result.photos = [];
    if (this.photosUrl?.length) {
      result.photos = this.photosUrl;
    }

    if (value.hasOwnProperty('work_time_group')) {
      result.work_time = this.buildWorkTime(value.work_time_group);
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
    console.log('valid', this.placeForm);
    const request: IPlace = this.buildRequest(this.placeForm.value);
    this.placesService.savePlace(request).subscribe((value) => {
      // this.router.navigateByUrl(`/places/${value.category_id}`);
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

  }
}
