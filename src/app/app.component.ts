import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';

import { Contact } from './models/contact';
import { FormOptions } from './shared/form-options'


@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder, FormOptions]

})

export class AppComponent {

  public form: any;

  @ViewChild('phone') phone: ElementRef;

  constructor(formBuilder: FormBuilder, public formOptions: FormOptions) {

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
