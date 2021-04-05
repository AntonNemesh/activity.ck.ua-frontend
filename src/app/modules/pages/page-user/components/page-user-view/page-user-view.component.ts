import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../../../services';
import {IUserActivity} from '../../../../../static/type';

@Component({
  selector: 'app-page-user-view',
  templateUrl: './page-user-view.component.html',
  styleUrls: ['./page-user-view.component.css']
})
export class PageUserViewComponent implements OnInit {
  constructor(private userService: UsersService) { }
  public userActivity: IUserActivity;

  ngOnInit(): void {
    this.userService.getUserActivity().subscribe((userActivity) => {
      this.userActivity = userActivity;
      console.log(this.userActivity);
    });
  }

}
