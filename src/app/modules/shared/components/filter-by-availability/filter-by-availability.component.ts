import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IAvailabilityFilter } from '../../../../static/type';
import { AVAILABILITY_FILTER } from '../../../../static/data';
import { FormArray, FormControl } from '@angular/forms';
import { AuthorizationService } from '../../../../services';
import {Observable} from 'rxjs';

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

  public isLoggedOut$: Observable<boolean> = this.authorizationService.isLoggedOut$;

  @Input() page: string;
  @Output()
  availabilityStateChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  public setAvailabilityFilter(isLoggedOut: boolean): void {
    this.availabilityFilter.forEach((item) => {
      if (this.page === 'events' && item.filter_id === 'opened' ||
          this.page === 'events' && item.filter_id === 'unexplored') {
        return;
      }
      if (isLoggedOut && item.filter_id === 'unexplored') {
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
    this.isLoggedOut$.subscribe((isLoggedOut) => {
      this.setAvailabilityFilter(isLoggedOut);
    });
    this.availabilityFilterArray.valueChanges.subscribe((value) => {
      this.selectedFilter = this.getAvailabilityFilterState(value);
      this.availabilityStateChange.emit(this.selectedFilter);
    });
  }

}
