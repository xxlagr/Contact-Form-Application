import { Valid } from "./models/valid"
import { Contact } from "./models/contact";
import { FormOptions } from './shared/form-options'

export class MyForm {

    private _formData: Contact;
    private _formOptions: FormOptions;

    constructor() {

        this._formData = new Contact();
        this._formOptions = new FormOptions();

    }

    // Возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields)
    public validate(): Valid {

        var result = new Valid();

        // Validate fio field

        // Validate phone number
        if (this._formOptions.phoneNumbersSum(this._formData.phone) > FormOptions.PHONE_MAX_NUMBERS_SUM
            || this._formData.phone.match(new RegExp(FormOptions.PHONE_PATTERN)) == null) {

            result.setFieldError(FormOptions.PHONE_FIELD_NAME);

        }

        return result;

    }

    // Возвращает объект с данными формы, где имена свойств совпадают с именами инпутов
    public getData(): Contact {

        return this._formData;

    }

    // Принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
    public setData(formData: Contact): void {

        this._formData = formData;

    }

    // Выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена.
    public submit(): void {

        this.validate();
        console.log("validation passed");

    }

}

