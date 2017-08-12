import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { Contact } from './models/contact';
import { FormOptions } from './shared/form-options';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder, FormOptions]

})

export class AppComponent {

  public form: FormGroup;

  constructor(formBuilder: FormBuilder, public formOptions: FormOptions) {

    // Build form object
    this.form = formBuilder.group(new Contact());

  }


  // Using for input mask
  @ViewChild('phone') phone: ElementRef;

  // Simple mask for phone number
  public maskPhoneInput(phoneValue: string): void {

    this.phone.nativeElement.value = "+7(";

    var result = phoneValue.match(/\d/g);

    if (result != null && result.length > 1) {

      for (let i: number = 1; i <= 10; i++) {

        if (result[i] == undefined) break;

        this.phone.nativeElement.value += result[i];

        if (i == 3) this.phone.nativeElement.value += ")";

        if (i == 6 || i == 8) this.phone.nativeElement.value += "-";

      }

    }

  }

  public submitForm(): void {

    // Submit form in MyForm obj
    window.MyForm.submit();

  }

}
