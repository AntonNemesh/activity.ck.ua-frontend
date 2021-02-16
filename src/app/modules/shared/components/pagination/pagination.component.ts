import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlacesService} from '../../../../services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  private typesId;
  private page;

  public totalPages;

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

  public setPage(event, page): void {
    event.preventDefault();
    this.page = page;
    this.paginationStateChange.emit(this.page);
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
  }

  ngOnInit(): void {
    this.updateTotalPages();
    this.resetPage();
  }

}
