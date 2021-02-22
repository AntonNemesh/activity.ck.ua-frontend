import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlacesService } from '../../../../services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  private typesId;
  private page: number;
  private buttonStart: number;
  private buttonEnd: number;
  private activeButtons: number[];

  public totalPages: number;
  public separatorState: boolean[];
  public isTheLastPage: boolean;

  @Input()
  categoryId;

  @Output()
  paginationStateChange = new EventEmitter<any>();

  private updateTotalPages(): void {
    let options;
    if (this.typesId !== undefined && this.typesId.length !== 0) {
      options = { type: this.typesId[0] };
    } else {
      options = { category: this.categoryId };
    }
    this.totalPages = this.placesService.amountPages(options);
  }

  private resetPage(): void {
    this.page = 1;
    this.isTheLastPage = true;
    this.activeButtons = [];
  }

  private initSeparator(): void {
    this.separatorState = [false, false];
  }

  private setVisibleButtons(buttonStart, buttonEnd, [separator1, separator2]): void {
    this.buttonStart = buttonStart;
    this.buttonEnd = buttonEnd;
    this.separatorState = [separator1, separator2];
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

  public checkButtonVisibility(page): boolean {
    let result = true;
    if (page === 1 ||
        page === this.totalPages ||
        page < this.buttonStart ||
        page > this.buttonEnd) { result = false; }
    return result;
  }

  public setPage(event, page): void {
    event.preventDefault();
    this.page = page;
    this.paginationStateChange.emit([this.page, 'numb']);
    this.activeButtons.length = 0;
    this.updateButtonsView();
  }

  public checkState(page): boolean {
    if (this.activeButtons.length === 0) { return this.page === page; }
    let result = false;
    this.activeButtons.forEach((item: number) => {
      if (item === page) { result = true; }
    });
    return result;
  }

  setNextPage(event): void {
    event.preventDefault();
    if (this.activeButtons.length === 0) { this.activeButtons.push(this.page); }
    this.activeButtons.push(++this.page);
    this.paginationStateChange.emit([this.page, 'more']);
    this.updateButtonsView();
  }

  @Input('typesId')
  set _typesId(value) {
    if (value === undefined) { return; }
    this.typesId = value;
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
