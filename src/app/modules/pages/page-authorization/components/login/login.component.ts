import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthorizationService } from '../../../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    password: new FormControl('', Validators.required)
  });

  public onSubmit(): void {
    if (this.loginForm.invalid) { return; }
    const authData: any = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    this.authorizationService.login(authData).subscribe(
      (data) => {
        this.authorizationService.accessToken = data.access_token;
        this.authorizationService.refreshToken = data.refresh_token;
        window.location.replace('/home');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.loginForm.get('email').setValue('test@gmail.com');
    this.loginForm.get('password').setValue('12345678');
  }

}
