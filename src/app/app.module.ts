import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent, MaxNumbersSumValidatorDirective } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MaxNumbersSumValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
