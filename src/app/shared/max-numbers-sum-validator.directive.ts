import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { FormOptions } from './form-options'

@Directive({

  selector: '[maxNumbersSum]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxNumbersSumValidatorDirective, multi: true }, FormOptions]

})

export class MaxNumbersSumValidatorDirective implements Validator {

  constructor(private _formOptions: FormOptions) {}

  validate(control: AbstractControl): { [key: string]: any } {

    return (this._formOptions.phoneNumbersSum(control.value) > this._formOptions.PHONE_MAX_NUMBERS_SUM) ? { 'maxNumbersSum': { value: control.value } } : null;

  }

}

