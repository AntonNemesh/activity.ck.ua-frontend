import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { CategoriesService, FilterByTypeService, PlacesService, OrganizationsService } from '../../../../../services';
import { IOrganization, IPlacesCategories, IPlacesTypes} from '../../../../../static/type';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  public phoneMask: any = ['+', '3', '8', /[0]/, ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

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

  public addPlaceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: this.placePhones,
    website: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    organization_id: new FormControl(null, Validators.required),
  });

  private setTypes(category: string): void {
    this.types.length = 0;
    const types: IPlacesTypes[] = this.filterByTypeService.getTypes(category);
    if (this.addPlaceForm.controls.type_id) { this.addPlaceForm.removeControl('type_id'); }

    if (!types?.length) { return; }
    this.addPlaceForm.addControl('type_id', new FormControl('', Validators.required));
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

  public get phoneFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.pattern('^\\+380\\s\\(\\d{2}\\)\\s\\d{3}\\s\\d{2}\\s\\d{2}')
    ]);
  }

  public buildPost(value: any): any{
    const result: any = Object.assign({organization: {}}, value);
    // console.log('value', value);
    // console.log('result', result);
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
    console.log(this.buildPost(this.addPlaceForm.value));
    // console.log(this.buildPost(this.addPlaceForm.value));
    this.placesService.savePlace(this.buildPost(this.addPlaceForm.value)).subscribe((value) => {
      // this.router.navigateByUrl(`/places/${value.category_id}`);
    });
  }

  public addPhone(event: Event): void {
    event.preventDefault();
    this.organizationPhones.push(this.phoneFormControl);
  }

  public addPhone2(event: Event): void {
    event.preventDefault();
    this.placePhones.push(this.phoneFormControl);
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories();

    this.organizationsService.getOrganizations().subscribe((organizations) => {
      this.organizations = organizations;

      this.filteredApprovedOrganizations = this.addPlaceForm.controls.organization_id.valueChanges
        .pipe(
          startWith(''),
          map((value) => {
            const result: string[] = this.filter(value, true);
            if (!result?.length) {
              this.addPlaceForm.addControl('organization', this.proposeOrganization);
              this.isNewOrganization = true;
            } else {
              this.isNewOrganization = false;
              this.addPlaceForm.removeControl('organization');
              this.proposeOrganization.reset();
            }
            return result;
          }),
        );

      this.filteredProposedOrganizations = this.proposeOrganization.controls.name.valueChanges
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

    this.addPlaceForm.controls.category_id.valueChanges.subscribe((value) => {
      this.setTypes(value);
    });

  }
}
