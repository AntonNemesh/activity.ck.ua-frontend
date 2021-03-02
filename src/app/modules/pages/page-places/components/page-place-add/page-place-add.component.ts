import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, FilterByTypeService, PlacesService } from '../../../../../services';
import { IPlacesCategories, IPlacesTypes } from '../../../../../static/type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-place-add',
  templateUrl: './page-place-add.component.html',
  styleUrls: ['./page-place-add.component.css']
})
export class PagePlaceAddComponent implements OnInit {
  public categories: IPlacesCategories[];
  public types: IPlacesTypes[] = [];

  constructor(
    private placesService: PlacesService,
    private categoriesService: CategoriesService,
    private filterByTypeService: FilterByTypeService,
    private router: Router) { }

  addPlaceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    type_id: new FormControl(''),
  });

  private setTypes(category: string): void {
    this.types.length = 0;

    const types: IPlacesTypes[] = this.filterByTypeService.getTypes(category);
    if (!types?.length) { return; }
    this.types = types;
  }

  public onSubmit(): void {
    this.placesService.savePlace(this.addPlaceForm.value).subscribe((value) => {
      this.router.navigateByUrl(`/places/${value.category_id}`);
    });
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories();
    this.addPlaceForm.controls.category_id.valueChanges.subscribe((value) => {
      this.setTypes(value);
    });
  }
}
