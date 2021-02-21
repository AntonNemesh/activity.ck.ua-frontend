import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IToleranceFilters } from '../../../../../../static/type';
import { TOLERANCE_FILTERS } from '../../../../../../static/data/tolerance-filter';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tolerance-filter',
  templateUrl: './tolerance-filter.component.html',
  styleUrls: [ './tolerance-filter.component.css' ]
})
export class ToleranceFilterComponent implements OnInit {
  public toleranceFilters: IToleranceFilters[] = TOLERANCE_FILTERS;
  public selectedFilters: string[];
  public toleranceFiltersArray = new FormArray([]);

  @Output()
  toleranceStateChange = new EventEmitter<string[]>();

  constructor() {
  }

  public setFilters(): void {
    this.toleranceFilters.forEach(() => {
      this.toleranceFiltersArray.push(new FormControl(false));
    });
  }

  checked(filterState: boolean[]): string[] {
    const selectedFilters = [];
    filterState.forEach((item: boolean, index: number) => {
      if (!item) {
        return;
      }
      selectedFilters.push({
        [ this.toleranceFilters[ index ].filterId ]: item
      });
    });
    return selectedFilters;
  }

  ngOnInit(): void {
    this.setFilters();
    this.toleranceFiltersArray.valueChanges.subscribe((value) => {
      this.selectedFilters = this.checked(value);
      this.toleranceStateChange.emit(this.selectedFilters);
      console.log(this.selectedFilters);
    });
  }

}
