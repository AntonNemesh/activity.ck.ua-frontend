import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  private buttonStart: number;
  private buttonEnd: number;
  private activeButtons: number[];

  public separatorState: boolean[];
  public isTheLastPage: boolean;
  public totalPages: number;

  public page: number;

  @Input() categoryId: string;
  @Input() isArrowPagination: boolean = false;

  @Input('totalPages')
  set _totalPages(value: number) {
    this.totalPages = value;
    this.updateButtonsView();
  }

  @Input('filterTypeState') set _filterTypeState(value: string[]) { this.resetPage(); }
  @Input('filterAvailabilityState') set _filterAvailabilityState(value: string[]) { this.resetPage(); }
  @Input('datePickerState') set _datePickerState(value: Date) { this.resetPage(); }

  @Output()
  paginationStateChange: EventEmitter<[number, boolean]> = new EventEmitter<[number, boolean]>();

  private resetPage(): void {
    this.page = 1;
    this.isTheLastPage = this.totalPages !== this.page;
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
    if (this.totalPages === undefined) { return; }

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

  concatPage(event: Event): void {
    event.preventDefault();
    if (this.activeButtons.length === 0) { this.activeButtons.push(this.page); }
    this.activeButtons.push(++this.page);
    this.paginationStateChange.emit([this.page, true]);
    this.updateButtonsView();
  }

  setPrevPage(): void {
    if (this.page <= 1) { return; }
    this.paginationStateChange.emit([--this.page, false]);
  }

  setNextPage(): void {
    if (this.page >= this.totalPages) { return; }
    this.paginationStateChange.emit([++this.page, false]);
  }

  ngOnInit(): void {
    this.resetPage();
    this.initSeparator();
    this.updateButtonsView();
  }
}
