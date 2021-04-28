import { Component, OnInit } from '@angular/core';
import { AuthorizationService, UsersService } from '../../../../services';
import { IUser } from '../../../../static/type';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService
  ) { }

  public isLoggedIn: boolean = this.authorizationService.isLoggedIn;

  public user: IUser;

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        this.user = data.user;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
