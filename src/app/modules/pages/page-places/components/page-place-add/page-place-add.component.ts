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

  public proposeOrganization: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  public organizationPhones: FormArray = new FormArray([this.phoneFormControl]);
  public placePhones: FormArray = new FormArray([this.phoneFormControl]);

  public placeWorkTime: FormGroup = new FormGroup({});

  public hasErrorPhotosRequired: boolean = false;

  public placeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    organization_id: new FormControl(null, Validators.required),
    main_photo: new FormControl('', Validators.required),
    photos: new FormControl(null, Validators.required),
    phones: this.placePhones,
    work_time: this.placeWorkTime,
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
      this.placeWorkTime.addControl(`${day.id}_start`, new FormControl(null, Validators.required));
      this.placeWorkTime.addControl(`${day.id}_end`, new FormControl(null, Validators.required));
    });
    this.toleranceFilter.forEach((item) => {
      this.placeForm.addControl(item.filter_id, new FormControl(false, Validators.required));
    });
  }

  private setTypes(category: string): void {
    this.types.length = 0;
    const types: IPlacesTypes[] = this.filterByTypeService.getTypes(category);
    if (this.placeForm.get('type_id')) { this.placeForm.removeControl('type_id'); }

    if (!types?.length) { return; }
    this.placeForm.addControl('type_id', new FormControl('', Validators.required));
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

  private updateErrorPhotosRequired(): void {
    this.hasErrorPhotosRequired = this.photos.length === 0;
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
              this.placeForm.get('main_photo').setValue(this.photosUrl[this.photoCover]);
              this.updateErrorPhotosRequired();
            });
          }),
        ).subscribe();
      } catch (error) { console.log(error); }
    }
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

    if (!images?.length || this.placeForm.get('photos').invalid) { return; }

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
    setTimeout(() => { this.loaderService.hide(); }, 500);
  }

  public handleAddressChange(address: any): void {
    this.placeForm.get('address').setValue(address.formatted_address);
  }

  public toggleDayOff(day: string): void {
    if (this.placeWorkTime.get(day + '_start').disabled ||
      this.placeWorkTime.get(day + '_end').disabled) {
      this.placeWorkTime.get(day + '_start').enable();
      this.placeWorkTime.get(day + '_end').enable();
    } else {
      this.placeWorkTime.get(day + '_start').disable();
      this.placeWorkTime.get(day + '_end').disable();
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

  public buildRequest(value: IPlaceForm): IPlace {
    const result: IPlace = Object.assign(value);
    result.photos = [];
    if (this.photosUrl?.length) {
      result.photos = this.photosUrl;
    }
    if (value.hasOwnProperty('work_time')) {
      result.work_time = this.buildWorkTime(value.work_time);
    }
    if  (!value.hasOwnProperty('organization')) {
      result.organization_id = this.getOrganizationId(value.organization_id);
      delete result.organization;
      return result;
    }
    if  (!value.organization.hasOwnProperty('email')) {
      result.organization_id = this.getOrganizationId(value.organization.name);
      delete result.organization;
      return result;
    }
    delete result.organization_id;
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
      this.placeForm.get('photos').setValue(null);
      this.placeForm.get('main_photo').setValue(null);
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

      this.filteredApprovedOrganizations = this.placeForm.get('organization_id').valueChanges
        .pipe(
          startWith(''),
          map((value) => {
            const result: string[] = this.filter(value, true);
            if (!result?.length) {
              this.placeForm.addControl('organization', this.proposeOrganization);
              this.isNewOrganization = true;
            } else {
              this.isNewOrganization = false;
              this.placeForm.removeControl('organization');
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

    this.placeForm.get('category_id').valueChanges.subscribe((value) => {
      this.setTypes(value);
    });

  }
}
