export class FilesValidator {

  constructor(private image: File) {
    this.image = image;
  }

  static messagesWarning: any = {
    type: [],
    size: []
  };

  static setMessageWarning(type: string, value: string|number): void {
    this.messagesWarning[type].push(value);
  }

  static getMessageWarning(type: string): string[] {
    return this.messagesWarning[type];
  }

  static resetMessageWarning(): void {
    for (const key in this.messagesWarning) {
      if (!this.messagesWarning.hasOwnProperty(key)) { continue; }
      this.messagesWarning[key].length = 0;
    }
  }

  static formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) { return '0 Bytes'; }
    const k: number = 1024;
    const dm: number = decimals < 0 ? 0 : decimals;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public checkTypeOfFile(types: string[] = ['jpeg', 'jpg']): boolean {
    if (this.image?.name) {
      const fileName: string = this.image.name;
      if ( !fileName ) { return true; }
      const extension: string = fileName.split('.')[1].toLowerCase();
      const conditions: boolean[] = [];
      types.forEach((type) => {
        conditions.push(type.toLowerCase() !== extension.toLowerCase());
      });
      return conditions.every((elem) => elem === true);
    }
  }

  public checkSizeOfFile(sizeInBytes: number = 1e6): boolean {
    if (this.image?.size) {
      const fileSize: number = this.image.size;
      if ( !fileSize ) { return true; }
      return fileSize > sizeInBytes;
    }
  }
}
