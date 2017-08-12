import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { FormOptions } from './form-options'

@Directive({

  selector: '[maxNumbersSum]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxNumbersSumValidatorDirective, multi: true }]

})

export class MaxNumbersSumValidatorDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } {

    return (FormOptions.phoneNumbersSum(control.value) > FormOptions.PHONE_MAX_NUMBERS_SUM) ?
      { 'maxNumbersSum': { value: control.value } } : null;

  }

}

