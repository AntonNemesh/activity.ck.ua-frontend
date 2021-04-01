import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../services';
import {IUserActivity} from '../../../../../static/type';

@Component({
  selector: 'app-page-user-view',
  templateUrl: './page-user-view.component.html',
  styleUrls: ['./page-user-view.component.css']
})
export class PageUserViewComponent implements OnInit {
  constructor(private userService: UserService) { }
  public userActivity: IUserActivity;

  ngOnInit(): void {
    this.userService.getUserActivity().subscribe((userActivity) => {
      this.userActivity = userActivity;
      console.log(this.userActivity);
    });
  }

}
