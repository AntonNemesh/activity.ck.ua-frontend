import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlacesService } from '../../../../services';
import { IPlaceRequestParams } from '../../../../static/type';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  private filterTypeState: string[] = [];
  private filterToleranceState: string[] = [];
  private page: number;
  private buttonStart: number;
  private buttonEnd: number;
  private activeButtons: number[];

  public totalPages: number;
  public separatorState: boolean[];
  public isTheLastPage: boolean;

  @Input()
  categoryId: string;

  @Output()
  paginationStateChange: EventEmitter<[number, boolean]> = new EventEmitter<[number, boolean]>();

  private updateTotalPages(): void {
    let options: Partial<IPlaceRequestParams>;
    if (this.filterTypeState?.length) {
      options = { type_id: this.filterTypeState[0] };
    } else {
      options = { category_id: this.categoryId };
    }
    if (this.filterToleranceState?.length) {
      this.filterToleranceState.forEach((item) => {
        options[item] = true;
      });
    }
    // this.totalPages = this.placesService.amountPages(options);
  }

  private resetPage(): void {
    this.page = 1;
    this.isTheLastPage = true;
    this.activeButtons = [];
  }

  private initSeparator(): void {
    this.separatorState = [false, false];
  }

  private setVisibleButtons(buttonStart: number, buttonEnd: number, separators: [boolean, boolean]): void {
    this.buttonStart = buttonStart;
    this.buttonEnd = buttonEnd;
    this.separatorState = separators;
  }

  private updateButtonsView(): void {
    this.isTheLastPage = this.totalPages !== this.page;

    if (this.totalPages <= 9) {
      this.setVisibleButtons(1, this.totalPages, [false, false]);
      return;
    }
    if (this.page < 8) {
      this.setVisibleButtons(1, 8, [false, true]);
      return;
    }
    if (this.page > (this.totalPages - 7) ) {
      this.setVisibleButtons(this.totalPages - 7, this.totalPages, [true, false]);
      return;
    }
    this.setVisibleButtons(this.page - 3, this.page + 3, [true, true]);
  }

  public checkButtonVisibility(page: number): boolean {
    let result: boolean = true;
    if (page === 1 ||
        page === this.totalPages ||
        page < this.buttonStart ||
        page > this.buttonEnd) { result = false; }
    return result;
  }

  public setPage(event: Event, page: number): void {
    event.preventDefault();
    this.page = page;
    this.paginationStateChange.emit([this.page, false]);
    this.activeButtons.length = 0;
    this.updateButtonsView();
  }

  public checkState(page: number): boolean {
    if (this.activeButtons.length === 0) { return this.page === page; }
    let result: boolean = false;
    this.activeButtons.forEach((item) => {
      if (item === page) { result = true; }
    });
    return result;
  }

  setNextPage(event: Event): void {
    event.preventDefault();
    if (this.activeButtons.length === 0) { this.activeButtons.push(this.page); }
    this.activeButtons.push(++this.page);
    this.paginationStateChange.emit([this.page, true]);
    this.updateButtonsView();
  }

  @Input('filterTypeState')
  set _filterTypeState(value: string[]) {
    this.filterTypeState = value;
    this.updateTotalPages();
    this.resetPage();
    this.updateButtonsView();
  }

  @Input('filterToleranceState')
  set _filterToleranceState(value: string[]) {
    this.filterToleranceState = value;
    this.updateTotalPages();
    this.resetPage();
    this.updateButtonsView();
  }

  ngOnInit(): void {
    this.updateTotalPages();
    this.resetPage();
    this.initSeparator();
    this.updateButtonsView();
  }

}
