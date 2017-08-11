import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaxNumbersSumValidatorDirective } from './shared/max-numbers-sum-validator.directive';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    MaxNumbersSumValidatorDirective   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
