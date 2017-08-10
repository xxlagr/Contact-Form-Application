import { Component, Input, ElementRef, ViewChild, Directive } from '@angular/core';
import { Contact } from "./models/contact";
import { FormsModule, FormBuilder, Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder]
})

export class AppComponent {

  public form: any;

  @ViewChild('phone') phone: ElementRef;

  constructor(formBuilder: FormBuilder) {

    this.form = formBuilder.group(new Contact());

    this.form.valueChanges.subscribe(formData => {

      window.MyForm.setData(formData);

    });

  }

  // Simple mask for phone number
  public maskPhoneInput(phoneValue: string): void {

    this.phone.nativeElement.value = "+7(";

    var result = phoneValue.match(/\d/g);

    if (result != null && result.length > 1) {

      for (var i: number = 1; i <= 10; i++) {

        if (result[i] == undefined) break;

        this.phone.nativeElement.value += result[i];

        if (i == 3) this.phone.nativeElement.value += ")";

        if (i == 6 || i == 8) this.phone.nativeElement.value += "-";

      }

    }

    this.form.value.phone = this.phone.nativeElement.value;

  }

  public submitForm(): void {

    window.MyForm.submit();

  }

}

@Directive({
  selector: '[maxNumbersSum]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxNumbersSumValidatorDirective, multi: true}]
})

export class MaxNumbersSumValidatorDirective implements Validator {

  @Input() maxNumbersSum: number;
 
  validate(control: AbstractControl): {[key: string]: any} {

    return this.maxNumbersSum ? maxNumbersSumValidator(this.maxNumbersSum)(control) : null;

  }

}

export function maxNumbersSumValidator(maxSum: number): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {

    var result = control.value.match(/\d/g);
    var sum = 0;

    if (result != null) {

      for(var i: number = 0;i<=10;i++) {
        
        if(result[i] == undefined) break;

        sum += parseInt(result[i]);

      }

    }

    const greaterThanMaxSum = sum > maxSum;

    return greaterThanMaxSum ? {'maxNumbersSum': {value: control.value}} : null;

  };

}
