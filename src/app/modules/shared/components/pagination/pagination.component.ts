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

  public totalPages: number;
  public separatorState: boolean[];

  @Input()
  categoryId;

  @Output()
  paginationStateChange = new EventEmitter<number>();

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
    if (this.totalPages <= 7) {
      this.setVisibleButtons(1, this.totalPages, [false, false]);
      return;
    }
    if (this.page < 6) {
      this.setVisibleButtons(1, 6, [false, true]);
      return;
    }
    if (this.page > (this.totalPages - 5) ) {
      this.setVisibleButtons(this.totalPages - 5, this.totalPages, [true, false]);
      return;
    }
    this.setVisibleButtons(this.page - 2, this.page + 2, [true, true]);
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
    this.paginationStateChange.emit(this.page);
    this.updateButtonsView();
  }

  public checkState(page): boolean {
    return this.page === page;
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
