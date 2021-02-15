import { Component, Input, OnInit } from '@angular/core';
import {PlacesService} from '../../../../services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  private typesId;
  public totalPages;

  @Input()
  categoryId;

  private updateTotalPages(): void {
    let options;
    if (this.typesId !== undefined && this.typesId.length !== 0) {
      options = { type: this.typesId[0] };
    } else {
      options = { category: this.categoryId };
    }
    this.totalPages = this.placesService.amountPages(options);
  }

  @Input('typesId')
  set _typesId(value) {
    if (value === undefined) { return; }
    this.typesId = value;
    this.updateTotalPages();
  }


  ngOnInit(): void {
    this.updateTotalPages();
  }

}
