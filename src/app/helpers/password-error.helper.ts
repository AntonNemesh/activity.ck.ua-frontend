import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl: boolean = !!(control && control.invalid && control.parent.dirty);
    const invalidParent: boolean = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

export class PasswordValidation {
  static checkPasswords(group: FormGroup): any {
    const pass: string = group.controls.password.value;
    const confirmPass: string = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }
}
