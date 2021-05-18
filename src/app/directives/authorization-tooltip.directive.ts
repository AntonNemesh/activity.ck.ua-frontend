import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizationService } from '../services';
import {Observable, Subscription} from 'rxjs';

@Directive({
  selector: '[appAuthorizationTooltip]'
})
export class AuthorizationTooltipDirective {

  constructor(
    private element: ElementRef,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private authorizationService: AuthorizationService
  ) { }

  public isLoggedOut$: Observable<boolean> = this.authorizationService.isLoggedOut$;
  public isLoggedOut: boolean;

  @HostListener('click') onClick(): void {
    if (this.isLoggedOut) {
      this.showTooltip();
      return;
    }
    const isLoggedOutSubscription: Subscription = this.isLoggedOut$.subscribe(
      (value) => {
        this.isLoggedOut = value;
        if (value) { this.showTooltip(); }
      }
    );
    isLoggedOutSubscription.unsubscribe();
  }

  private showTooltip(): void {
    const tooltip: any = this.matSnackBar.open(
      'Цей функціонал доступний тільки для авторизованого користувача.',
      'Авторизуватись?',
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 3000 }
    );
    tooltip.onAction().subscribe(
      () => { this.router.navigateByUrl('/authorization'); }
    );
  }
}
