import { Component, OnInit } from '@angular/core';
import { IToleranceFilters } from '../../../../../../static/type/tolerance-filter.interface';
import { TOLERANCE_FILTERS } from '../../../../../../static/data/tolerance-filter';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tolerance-filter',
  templateUrl: './tolerance-filter.component.html',
  styleUrls: ['./tolerance-filter.component.css']
})
export class ToleranceFilterComponent implements OnInit {
  public toleranceFilters: IToleranceFilters[] = TOLERANCE_FILTERS;
  public selectedFilters: string[];
  toleranceFiltersArray = new FormArray ([]);

  public setFilters(): void {
    this.toleranceFilters.forEach(() => { this.toleranceFiltersArray.push(new FormControl(false)); });
  }

  constructor() { }

  checked(filterState: boolean[]): string[] {
    console.log('checked');
    console.log(this.toleranceFiltersArray.value);
    const selectedFilters = [];
    filterState.forEach((item: boolean, index: number) => {
      if (!item) { return; }
      selectedFilters.push(this.toleranceFilters[index].filterId);
    });
    return selectedFilters;
  }

  ngOnInit(): void {
    console.log(this.toleranceFiltersArray);
    this.setFilters();
    this.toleranceFiltersArray.valueChanges.subscribe((value) => {
      this.selectedFilters = this.checked(value);
      console.log(this.selectedFilters);
    });
  }

}
