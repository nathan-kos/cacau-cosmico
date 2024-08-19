import { AbstractControl, ValidatorFn } from '@angular/forms';

function fieldsMatchValidator(field1: string, field2: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fieldValue1 = control.get(field1);
    const fieldValue2 = control.get(field2);

    if (fieldValue1 && fieldValue2 && fieldValue1.value !== fieldValue2.value) {
      return { fieldsMismatch: true };
    }

    return null;
  };
}

export { fieldsMatchValidator };
