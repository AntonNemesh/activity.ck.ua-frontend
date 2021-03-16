import { FormControl } from '@angular/forms';

export function fileTypeValidator( types: string[] ): any {
  return (control: FormControl) => {
    const file: string = control.value;
    if ( file ) {
      const extension: string = file.split('.')[1].toLowerCase();

      const conditions: boolean[] = [];
      types.forEach((type) => {
        conditions.push(type.toLowerCase() !== extension.toLowerCase());
      });

      const condition: boolean = conditions.every((elem) => elem === true);
      if (condition) { return { fileType: true }; }
      return null;
    }
    return null;
  };
}
