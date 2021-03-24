import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilesValidator } from '../../../../../validators';
import { CategoriesService, FilesService, FilterByTypeService, OrganizationsService, PlacesService } from '../../../../../services';
import { Router } from '@angular/router';
import { LoaderHelper } from '../../../../../helpers';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-uploader-for-photos',
  templateUrl: './uploader-for-photos.component.html',
  styleUrls: ['./uploader-for-photos.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploaderForPhotosComponent),
      multi: true
    }
  ]
})
export class UploaderForPhotosComponent implements OnInit, ControlValueAccessor {

  constructor(
    private placesService: PlacesService,
    private categoriesService: CategoriesService,
    private filterByTypeService: FilterByTypeService,
    private router: Router,
    private organizationsService: OrganizationsService,
    private filesService: FilesService) { }

  @Input('photosGroupValidation')
  set _photosGroupValidation(value: boolean) {
    this.updateErrorPhotosRequired();
  }

  public photosInput: FormControl = new FormControl('');

  public hasErrorPhotosRequired: boolean;

  public photos: any[] = [];
  public photosB64: string[] = [];
  public photoCover: number = 0;
  public photosLimit: number = 5;

  public messagesWarningOfType: string[];
  public messagesWarningOfSize: string[];
  public messagesWarningOfAmount: string[];

  public photosLoader: LoaderHelper = new LoaderHelper();
  public photosLoaderVisible: Subject<boolean> = this.photosLoader.getLoaderState();
  public photosContentVisible: Subject<boolean> = this.photosLoader.getContentState();

  @Output() photosGroupValue: EventEmitter<string|null> = new EventEmitter<string|null>();
  @Output() photosState: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() photoCoverState: EventEmitter<number> = new EventEmitter<number>();

  public async selectFiles(event: any): Promise<any> {
    let selectFilesCounter: number = 0;
    const images: File[] = event.target.files;
    FilesValidator.resetFilesWarning();

    // if (!images?.length || this.photosGroup.get('photos').invalid) { return; }
    if (!images?.length) { return; }

    this.hasErrorPhotosRequired = false;
    this.photosLoader.show();

    for (const image of images) {
      try {
        const imgValidator: FilesValidator = new FilesValidator(image);

        if (imgValidator.checkTypeOfFile()) {
          FilesValidator.setFileWarning('type', `"${image.name}"`);
          this.messagesWarningOfType = FilesValidator.getFilesWarning('type');
          continue;
        }

        if (imgValidator.checkSizeOfFile()) {
          FilesValidator.setFileWarning('size', `"${image.name}" - ${FilesValidator.formatBytes(image.size)}`);
          this.messagesWarningOfSize = FilesValidator.getFilesWarning('size');
          continue;
        }

        if (this.photos.length >= this.photosLimit) {
          FilesValidator.setFileWarning('amount', `"${image.name}"`);
          this.messagesWarningOfAmount = FilesValidator.getFilesWarning('amount');
          continue;
        }

        console.log(`select: ${++selectFilesCounter}`);

        const compressedFile: File = await this.filesService.compress(image);
        const compressedFileB64: string = await this.filesService.getBase64(compressedFile);

        if (!compressedFile || !compressedFileB64) { continue; }

        this.photos.push(compressedFile);
        this.photosB64.push(compressedFileB64);

      } catch (error) { console.log(error); }
    }

    if (this.photos?.length) {
      this.photosGroupValue.emit('a');
      this.updateErrorPhotosRequired();
    }

    this.photosState.emit(this.photos);

    setTimeout(() => { this.photosLoader.hide(); }, 500);
  }

  public selectCoverPhoto(index: number): void {
    this.photoCover = index;
    this.photoCoverState.emit(index);
  }

  public deletePhotoByIndex(index: number): void {
    this.photos.splice(index, 1);
    this.photosB64.splice(index, 1);
    this.photoCover = 0;
    this.photoCoverState.emit(0);
    FilesValidator.resetFilesWarning();
    this.updateErrorPhotosRequired();
    this.photosState.emit(this.photos);
    if (!this.photos?.length) {
      this.photosGroupValue.emit(null);
    }
  }

  public updateErrorPhotosRequired(): void {
    this.hasErrorPhotosRequired = this.photos.length === 0;
  }

  public writeValue(): void { }
  public registerOnChange(): void { }
  public registerOnTouched(): void { }

  ngOnInit(): void {
    this.hasErrorPhotosRequired = false;
  }
}
