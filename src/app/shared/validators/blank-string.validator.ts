import { AbstractControl } from '@angular/forms';

export function blankStringValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const isBlank = control.value.trim() ? false : true;
  return isBlank ? { blankString: true } : null;
}
