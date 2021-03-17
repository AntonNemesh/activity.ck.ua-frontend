import { FormControl } from '@angular/forms';

export function fileTypeValidator( types: string[] ): any {
  return (control: FormControl) => {
    const result: any = [];
    if (control.value && typeof control.value !== 'string') {
      const files: File[] = Array.prototype.slice.call(control.value);
      files.forEach((item) => {
        const file: string = item.name;
        if ( !file ) { result.push(null); return; }
        const extension: string = file.split('.')[1].toLowerCase();
        const conditions: boolean[] = [];
        types.forEach((type) => {
          conditions.push(type.toLowerCase() !== extension.toLowerCase());
        });

        const condition: boolean = conditions.every((elem) => elem === true);
        if (condition) { result.push({ fileType: true }); return; }
        result.push(null);
      });
      const access: boolean = result.every((elem) => elem === null);
      if (access) {
        return null;
      }
      return { fileType: true };
    }
  };
}
