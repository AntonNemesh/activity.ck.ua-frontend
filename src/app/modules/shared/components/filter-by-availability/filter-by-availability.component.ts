import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IAvailabilityFilter } from '../../../../static/type';
import { AVAILABILITY_FILTER } from '../../../../static/data';
import { FormArray, FormControl } from '@angular/forms';
import { AuthorizationService } from '../../../../services';

@Component({
  selector: 'app-filter-by-availability',
  templateUrl: './filter-by-availability.component.html',
  styleUrls: [ './filter-by-availability.component.css' ]
})
export class FilterByAvailabilityComponent implements OnInit {
  constructor(private authorizationService: AuthorizationService) { }

  public availabilityFilter: IAvailabilityFilter[] = AVAILABILITY_FILTER;
  public selectedFilter: string[];
  public availabilityFilterArray: FormArray = new FormArray([]);

  public isLoggedIn: boolean = this.authorizationService.isLoggedIn;

  @Input() page: string;
  @Output()
  availabilityStateChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  public setAvailabilityFilter(): void {
    this.availabilityFilter.forEach((item) => {
      if (this.page === 'events' && item.filter_id === 'opened' ||
          this.page === 'events' && item.filter_id === 'unexplored') {
        return;
      }
      if (item.filter_id === 'unexplored' && !this.isLoggedIn) {
        this.availabilityFilterArray.push(new FormControl({value: false, disabled: true}));
        return;
      }
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
