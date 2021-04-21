import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services';
import { IUser } from '../../../../static/type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  public user: IUser;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
  }
}
