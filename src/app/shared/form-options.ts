import { Injectable } from "@angular/core";
import { Valid } from "../models/valid";

@Injectable()

export class FormOptions {

    public static FORM_ID = "myForm";
    public static FIO_FIELD_NAME = "fio";
    public static FIO_PATTERN = "([a-zA-Zа-яА-я-]{1,255})([ ]{1,})([a-zA-Zа-яА-я-]{1,255})([ ]{1,})([a-zA-Zа-яА-я-]{1,255})";
    public static EMAIL_FIELD_NAME = "email";
    public static EMAIL_PATTERN = "([a-z0-9_.-]{1,64})@((ya.ru)|(yandex.(ru|kz|com|by|ua])))";
    public static PHONE_MAX_NUMBERS_SUM = 30;
    public static PHONE_FIELD_NAME = "phone";
    public static PHONE_PATTERN = "[+]7[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}";
    public static RESULT_CONTAINER_ID = "resultContainer";
    public static SUBMIT_BUTTON_ID = "submitButton";
    public static ERROR_CLASS = "error";
    public static SUCCESS_CLASS = "success";
    public static PROGRESS_CLASS = "progress";

    // Static properties aren't accessible in templates.
    get FORM_ID(): string { return FormOptions.FORM_ID }

    get PHONE_MAX_NUMBERS_SUM(): number { return FormOptions.PHONE_MAX_NUMBERS_SUM }

    get PHONE_FIELD_NAME(): string { return FormOptions.PHONE_FIELD_NAME }

    get PHONE_PATTERN(): string { return FormOptions.PHONE_PATTERN }

    get EMAIL_FIELD_NAME(): string { return FormOptions.EMAIL_FIELD_NAME }

    get EMAIL_PATTERN(): string { return FormOptions.EMAIL_PATTERN }

    get FIO_FIELD_NAME(): string { return FormOptions.FIO_FIELD_NAME }

    get FIO_PATTERN(): string { return FormOptions.FIO_PATTERN }

    get SUBMIT_BUTTON_ID(): string { return FormOptions.SUBMIT_BUTTON_ID };

    get RESULT_CONTAINER_ID(): string { return FormOptions.RESULT_CONTAINER_ID }

    // Count phone numbers sum
    public static phoneNumbersSum(phone: string): number {

        var matches = phone.match(/\d/g);
        var sum = 0;

        if (matches != null) {

            for (let i: number = 0; i <= 10; i++) {

                if (matches[i] == undefined) break;

                sum += parseInt(matches[i]);

            }

        }

        return sum;

    }

    // Set error class to fields from Valid's errorFields
    public static setFormErrors(validationResult: Valid): void {

        // Remove error class
        (<HTMLInputElement>document.getElementsByName(FormOptions.FIO_FIELD_NAME)[0]).classList.remove(FormOptions.ERROR_CLASS);
        (<HTMLInputElement>document.getElementsByName(FormOptions.EMAIL_FIELD_NAME)[0]).classList.remove(FormOptions.ERROR_CLASS);
        (<HTMLInputElement>document.getElementsByName(FormOptions.PHONE_FIELD_NAME)[0]).classList.remove(FormOptions.ERROR_CLASS);

        if (!validationResult.isValid) {

            validationResult.errorFields.forEach(element => {

                (<HTMLInputElement>document.getElementsByName(element)[0]).classList.add(FormOptions.ERROR_CLASS);

            });

        }

    }

    // Get form action from action property. "должен отправиться ajax-запрос на адрес, указанный в атрибуте action формы"
    public static getFormAction(): string {

        return (<HTMLFormElement>document.getElementById(FormOptions.FORM_ID)).action;

    }

    // Set form action. Using for tests
    public setFormAction(actionUrl: string): void {

        (<HTMLFormElement>document.getElementById(FormOptions.FORM_ID)).action = actionUrl;

    }

}