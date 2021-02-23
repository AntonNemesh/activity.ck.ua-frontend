import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IToleranceFilter } from '../../../../../../static/type';
import { TOLERANCE_FILTER } from '../../../../../../static/data/tolerance-filter';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-by-tolerance',
  templateUrl: './filter-by-tolerance.component.html',
  styleUrls: [ './filter-by-tolerance.component.css' ]
})
export class FilterByToleranceComponent implements OnInit {
  public toleranceFilter: IToleranceFilter[] = TOLERANCE_FILTER;
  public selectedFilter: string[];
  public toleranceFilterArray = new FormArray([]);

  @Output()
  toleranceStateChange = new EventEmitter<string[]>();

  constructor() {
  }

  public setToleranceFilter(): void {
    this.toleranceFilter.forEach(() => {
      this.toleranceFilterArray.push(new FormControl(false));
    });
  }

  getToleranceFilterState(filterState: boolean[]): string[] {
    const selectedFilter = [];
    filterState.forEach((item: boolean, index: number) => {
      if (!item) {
        return;
      }
      selectedFilter.push({
        [ this.toleranceFilter[ index ].filterId ]: item
      });
    });
    return selectedFilter;
  }

  ngOnInit(): void {
    this.setToleranceFilter();
    this.toleranceFilterArray.valueChanges.subscribe((value) => {
      this.selectedFilter = this.getToleranceFilterState(value);
      this.toleranceStateChange.emit(this.selectedFilter);
    });
  }

}
