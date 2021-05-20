import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { last, switchMap } from 'rxjs/operators';
import imageCompression from 'browser-image-compression';
import { FilesValidator } from '../validators';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private angularFireStorage: AngularFireStorage) { }

  public async compress(image: File): Promise<File> {
    const options: any = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };
    try {
      const compressedFile: any = await imageCompression(image, options);
      console.log(
        `%c Original: ${FilesValidator.formatBytes(image.size)}` +
        '%c =>' +
        `%c Compressed: ${FilesValidator.formatBytes(compressedFile.size)}`,
        'color:blue;', 'color:black;', 'color:green;'
      );
      return compressedFile;
    } catch (error) {
      console.log('oops', error);
    }
  }

  public async getBase64(file: File): Promise<string> {
    return imageCompression.getDataUrlFromFile(file);
  }

  public upload(photos: File[]): Observable<string[]> {
    let uploadFilesCounter: number = 0;
    const streams: Observable<any>[] = [];

    for (const photo of photos) {
      try {
        console.log(`upload: ${++uploadFilesCounter}`);

        const filePath: string = 'images/' + Date.now() + photo.name;
        const fileRef: AngularFireStorageReference = this.angularFireStorage.ref(filePath);

        streams.push(this.angularFireStorage.upload(filePath, photo).snapshotChanges().pipe(
          last(),
          switchMap(() => {
            return fileRef.getDownloadURL();
          })
        ));
      } catch (error) { console.log('oops', error); }
    }
    return forkJoin(streams);
  }

  public delete(urls: string[]): void {
    urls.forEach((url) => {
      this.angularFireStorage.storage.refFromURL(url).delete();
    });
  }
}
