import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterByTypeService } from '../../../../../services';
import { IPlacesTypes } from '../../../../../static/type';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-by-type',
  templateUrl: './filter-by-type.component.html',
  styleUrls: ['./filter-by-type.component.css']
})
export class FilterByTypeComponent implements OnInit {
  @Input()
  categoryId;
  public formTypes = new FormArray([]);
  public selectedTypes: string[];
  public types: IPlacesTypes[];

  @Output()
  filterStateChange = new EventEmitter<string[]>();

  constructor(private filterByTypeService: FilterByTypeService) { }

  private setTypes(categoriesId): void {
    const types: IPlacesTypes[] = this.filterByTypeService.getTypes(this.categoryId);
    if (types[0].type_id === categoriesId) { return; }
    this.types = types;
    this.types.forEach(() => { this.formTypes.push(new FormControl(false)); });
  }

  public getSelectedTypes(filterState: boolean[]): string[] {
    const selectedTypes = [];
    filterState.forEach((item: boolean, index: number) => {
      if (!item) { return; }
      selectedTypes.push(this.types[index].type_id);
    });
    return selectedTypes;
  }

  ngOnInit(): void {
    this.setTypes(this.categoryId);
    this.formTypes.valueChanges.subscribe((value) => {
      this.selectedTypes = this.getSelectedTypes(value);
      this.filterStateChange.emit(this.selectedTypes);
    });
  }

}
