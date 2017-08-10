import { Valid } from "./models/valid"
import { Contact } from "./models/contact";

export class MyForm {

    public static PHONE_MAX_NUMBERS_SUM = 30;
    public static PHONE_FIELD_NAME = "phone";

    private _formData: Contact;

    constructor() {

        this._formData = new Contact();

    }

    // Возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields)
    public validate(): Valid {

        var result = new Valid();

        // Validate phone number
        if(this.phoneNumbersSum(this._formData.phone) > MyForm.PHONE_MAX_NUMBERS_SUM) {

            result.setFieldError(MyForm.PHONE_FIELD_NAME);

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

    private phoneNumbersSum(phone: string): number {

        return MyForm.PHONE_MAX_NUMBERS_SUM;

    }

}

