import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services';
import { IUser } from '../../../../static/type';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
  constructor(private usersService: UsersService) { }

  public user: IUser;

  private updateInfo(): void {
    this.usersService.getUserInfo().subscribe((data) => {
      this.user = data.user;
    });
  }

  ngOnInit(): void {
    if (!this.user) { this.updateInfo(); }
  }

}
