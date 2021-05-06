import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordErrorStateMatcher, PasswordValidation } from '../../../../../helpers';
import { AuthorizationService, FilesService } from '../../../../../services';
import { IUser } from '../../../../../static/type';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private filesService: FilesService, private authorizationService: AuthorizationService) { }

  public matcher: PasswordErrorStateMatcher = new PasswordErrorStateMatcher();

  public isRegisteredUser: boolean = false;

  public photosGroupValidation: boolean = false;

  public clearUploader: boolean = false;

  public photos: any[] = [];
  public photosUrl: string[] = [];
  public photoCover: number = 0;

  public passwordGroup: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['']
  }, { validator: PasswordValidation.checkPasswords });

  public photosGroup: FormGroup = new FormGroup({
    main_photo: new FormControl('', Validators.required),
    photos: new FormControl(null, Validators.required),
  });

  public registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    name: new FormControl('', [Validators.required]),
    password_group: this.passwordGroup,
    photos_group: this.photosGroup,
  });

  public setPhotosGroupValue(photosGroupState: string|null): void {
    this.photosGroup.get('photos').setValue(photosGroupState, { emitModelToViewChange: false });
    this.photosGroup.get('main_photo').setValue(photosGroupState);
  }

  public setPhotos(photos: File[]): void {
    this.photos = photos;
  }

  public setPhotoCover(index: number): void {
    this.photoCover = index;
  }

  public updatePhotosGroupValidation(): void {
    this.photosGroupValidation = !this.photosGroupValidation;
  }

  public clearPhotos(): void {
    this.filesService.delete(this.photosUrl);
    this.photosUrl.length = 0;
    this.photos.length = 0;
    this.clearUploader = !this.clearUploader;
  }

  public onSubmit(): void {
    this.isRegisteredUser = false;
    if (this.registrationForm.invalid) { return; }

    this.filesService.upload(this.photos).subscribe((urls) => {
      urls.forEach((url) => { this.photosUrl.push(url); });
      const request: IUser = this.authorizationService.buildRegistrationRequest(this.registrationForm.value, this.photosUrl);
      this.authorizationService.registration(request).subscribe(
        (data) => {
          this.registrationForm.get('email').setErrors(null);
          this.isRegisteredUser = true;
          console.log('success', data);
        },
        (error) => {
          this.registrationForm.get('email').setErrors({registered: true});
          this.clearPhotos();
          this.updatePhotosGroupValidation();
          console.log('oops', error);
        }
      );
    });
  }

  ngOnInit(): void { }

}
