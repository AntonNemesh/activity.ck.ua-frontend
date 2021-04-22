import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateService } from '../../../../services';
import { IPlaceReview } from '../../../../static/type';

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css']
})
export class CommentsViewComponent implements OnInit {
  constructor(public dateService: DateService) { }

  public limit: number = 3;

  @Input() reviews: IPlaceReview[];
  @Input() totalPages: number;
  @Input() reviewsState: any;
  @Output() paginationStateChange: EventEmitter<[number, boolean]> = new EventEmitter<[number, boolean]>();

  public updatePaginationState(paginationState: [number, boolean]): void {
    this.paginationStateChange.emit(paginationState);
  }

  ngOnInit(): void { }
}
