import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services';
import { IUser } from '../../../../static/type';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
  constructor(private userService: UserService) { }

  public user: IUser;

  private updateInfo(): void {
    this.userService.getUserInfo().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (!this.user) {
      this.updateInfo();
    }
  }

}
