import { AbstractControl, ValidatorFn } from '@angular/forms';

function passwordStrengthValidator(field: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get(field)?.value;

    // Regras da senha
    const hasMinLength = password ? password.length >= 8 : false;
    const hasUpperCase = password ? /[A-Z]/.test(password) : false;
    const hasLowerCase = password ? /[a-z]/.test(password) : false;
    const hasSpecialChar = password
      ? /[!@#$%^&*(),.?":{}|<>]/.test(password)
      : false;

    // Verifica se a senha atende a todas as regras
    const passwordValid =
      hasMinLength && hasUpperCase && hasLowerCase && hasSpecialChar;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}

export { passwordStrengthValidator };
