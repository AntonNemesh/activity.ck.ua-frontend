import { Component, OnInit } from '@angular/core';
import { AuthorizationService, UsersService } from '../../../../services';
import { IUser } from '../../../../static/type';
import { ActivatedRoute } from '@angular/router';

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

  private lifeCycleAccessToken: number = this.authorizationService.getLifeCycleOfAccessToken();
  public isLoggedIn: boolean = this.authorizationService.isLoggedIn;

  public user: IUser;

  public logout(): void {
    this.authorizationService.logout().subscribe(
      (value) => {
        this.authorizationService.deleteTokens();
        window.location.replace('/home');
      },
      (error) => {
          console.log(error);
      }
    );
  }

  ngOnInit(): void {
    console.log(this.lifeCycleAccessToken, this.isLoggedIn);
    if (this.lifeCycleAccessToken < 2) {
      this.authorizationService.updateTokens();
    }
    this.route.data.subscribe(
(data) => {
        if (data.user) {
          this.user = data.user;
          this.authorizationService.isLoggedIn = true;
        } else {
          this.authorizationService.isLoggedIn = false;
        }
      },
(error) => {
        console.log(error);
      }
    );
  }
}
