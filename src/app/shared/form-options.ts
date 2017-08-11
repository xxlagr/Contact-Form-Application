import { Injectable } from "@angular/core";

@Injectable()

export class FormOptions { 

    public static FIO_FIELD_NAME = "fio";
    public static FIO_PATTERN = "([a-zA-Zа-яА-я-]{1,255})([ ]{1,})([a-zA-Zа-яА-я-]{1,255})([ ]{1,})([a-zA-Zа-яА-я-]{1,255})";
    public static EMAIL_FIELD_NAME = "email";
    public static EMAIL_PATTERN = "([a-z_.-]{1,64})@((ya.ru)|(yandex.(ru|kz|com|by|ua])))";
    public static PHONE_MAX_NUMBERS_SUM = 30;
    public static PHONE_FIELD_NAME = "phone";
    public static PHONE_PATTERN = "[+]7[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}";

    // Static properties aren't accessible in templates.

    get PHONE_MAX_NUMBERS_SUM(): number { return FormOptions.PHONE_MAX_NUMBERS_SUM }

    get PHONE_FIELD_NAME(): string { return FormOptions.PHONE_FIELD_NAME }

    get PHONE_PATTERN(): any { return FormOptions.PHONE_PATTERN }

    get EMAIL_FIELD_NAME(): string { return FormOptions.EMAIL_FIELD_NAME }

    get EMAIL_PATTERN(): string { return FormOptions.EMAIL_PATTERN }

    get FIO_FIELD_NAME(): string { return FormOptions.FIO_FIELD_NAME }

    get FIO_PATTERN(): string { return FormOptions.FIO_PATTERN }

    // Count phone numbers sum
    public phoneNumbersSum(phone: string): number {

        var result = phone.match(/\d/g);
        var sum = 0;

        if (result != null) {

            for (var i: number = 0; i <= 10; i++) {

                if (result[i] == undefined) break;

                sum += parseInt(result[i]);

            }

        }

        return sum;

    }

 }