import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IAvailabilityFilter } from '../../../../static/type';
import { AVAILABILITY_FILTER } from '../../../../static/data';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-by-availability',
  templateUrl: './filter-by-availability.component.html',
  styleUrls: [ './filter-by-availability.component.css' ]
})
export class FilterByAvailabilityComponent implements OnInit {
  public availabilityFilter: IAvailabilityFilter[] = AVAILABILITY_FILTER;
  public selectedFilter: string[];
  public availabilityFilterArray: FormArray = new FormArray([]);

  @Output()
  availabilityStateChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() {
  }

  public setAvailabilityFilter(): void {
    this.availabilityFilter.forEach(() => {
      this.availabilityFilterArray.push(new FormControl(false));
    });
  }

  getAvailabilityFilterState(filterState: boolean[]): string[] {
    const selectedFilter: string[] = [];
    filterState.forEach((item, index) => {
      if (!item) { return; }
      selectedFilter.push(this.availabilityFilter[index].filter_id);
    });
    return selectedFilter;
  }

  ngOnInit(): void {
    this.setAvailabilityFilter();
    this.availabilityFilterArray.valueChanges.subscribe((value) => {
      this.selectedFilter = this.getAvailabilityFilterState(value);
      this.availabilityStateChange.emit(this.selectedFilter);
    });
  }

}
