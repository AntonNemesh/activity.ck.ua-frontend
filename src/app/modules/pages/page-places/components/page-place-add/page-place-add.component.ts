import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, FilterByTypeService, PlacesService, OrganizationsService } from '../../../../../services';
import {
  IMaskEmail,
  IOrganization,
  IPlace,
  IPlaceForm,
  IPlacesCategories,
  IPlacesTypes,
  IWeek,
  IWorkTime,
  IWorkTimeForm } from '../../../../../static/type';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MASK_PHONE, MASK_EMAIL, PATTERN_PHONE, WEEK } from '../../../../../static/data';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

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

  constructor(
    private placesService: PlacesService,
    private categoriesService: CategoriesService,
    private filterByTypeService: FilterByTypeService,
    private router: Router,
    private organizationsService: OrganizationsService) { }

  public proposeOrganization: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  public organizationPhones: FormArray = new FormArray([this.phoneFormControl]);
  public placePhones: FormArray = new FormArray([this.phoneFormControl]);

  public placeWorkTime: FormGroup = new FormGroup({});

  public placeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    organization_id: new FormControl(null, Validators.required),
    phones: this.placePhones,
    work_time: this.placeWorkTime,
  });

  public googlePlacesOptions: any = {
    types: [],
    componentRestrictions: {
      country: 'UA',
    },
  };

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  private initWeekFormControls(): void {
    this.week.forEach((day) => {
      this.placeWorkTime.addControl(`${day.id}_start`, new FormControl(null, Validators.required));
      this.placeWorkTime.addControl(`${day.id}_end`, new FormControl(null, Validators.required));
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

  public onSubmit(): void {
    if (this.placeForm.invalid) { return; }
    const request: IPlace = this.buildRequest(this.placeForm.value);
    this.placesService.savePlace(request).subscribe((value) => {
      // this.router.navigateByUrl(`/places/${value.category_id}`);
    });
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

  ngOnInit(): void {
    this.initWeekFormControls();
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
