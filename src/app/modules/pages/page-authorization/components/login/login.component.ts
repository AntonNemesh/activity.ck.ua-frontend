import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../../../services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private matSnackBar: MatSnackBar) { }

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
      (tokens) => {
        this.authorizationService.createSession(tokens);
      },
      (error) => {
        this.matSnackBar.open(
          'Невірна електронна адреса користувача або пароль!', '',
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 2000 }
        );
        console.log('oops', error);
      },
    );
  }

  ngOnInit(): void {
  }

}
