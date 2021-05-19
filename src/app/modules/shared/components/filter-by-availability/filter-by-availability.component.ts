import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IAvailabilityFilter } from '../../../../static/type';
import { AVAILABILITY_FILTER } from '../../../../static/data';
import { FormArray, FormControl } from '@angular/forms';
import { AuthorizationService } from '../../../../services';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-by-availability',
  templateUrl: './filter-by-availability.component.html',
  styleUrls: [ './filter-by-availability.component.css' ]
})
export class FilterByAvailabilityComponent implements OnInit {
  constructor(
    private authorizationService: AuthorizationService,
    private matSnackBar: MatSnackBar,
    private router: Router) { }

  public availabilityFilter: IAvailabilityFilter[] = AVAILABILITY_FILTER;
  public selectedFilter: string[];
  public availabilityFilterArray: FormArray = new FormArray([]);

  public isLoggedOut$: Observable<boolean> = this.authorizationService.isLoggedOut$;

  @Input() page: string;
  @Output()
  availabilityStateChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  public setAvailabilityFilter(): void {
    this.availabilityFilter.forEach((item) => {
      if (this.page === 'events' && item.filter_id === 'opened' ||
          this.page === 'events' && item.filter_id === 'unexplored') {
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

  private showTooltip(): void {
    const tooltip: any = this.matSnackBar.open(
      'Цей функціонал доступний тільки для авторизованого користувача.',
      'Авторизуватись?',
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 3000 }
    );
    tooltip.onAction().subscribe(
      () => { this.router.navigateByUrl('/authorization'); }
    );
  }

  ngOnInit(): void {
    this.setAvailabilityFilter();
    this.availabilityFilterArray.valueChanges.subscribe((value) => {
      this.isLoggedOut$.subscribe((isLoggedOut) => {
        this.selectedFilter = this.getAvailabilityFilterState(value);
        const condition: undefined|string = this.selectedFilter.find(item => item === 'unexplored');
        if (isLoggedOut && condition) { this.showTooltip(); }
        this.availabilityStateChange.emit(this.selectedFilter);
      });
    });
  }

}
