import { Valid } from "./models/valid"
import { Contact } from "./models/contact";
import { FormOptions } from './shared/form-options';
import { FormResponseService } from './services/form-response.service';
import { FormResponse } from './models/form-response';

export class MyForm {

    private _formResponseService: FormResponseService;

    constructor() {

        this._formResponseService = new FormResponseService();

    }

    // Возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields)
    public validate(): Valid {

        var formData = this.getData();
        var result = new Valid();

        // Validate fio field
        if (formData.fio.match(new RegExp(FormOptions.FIO_PATTERN)) == null) {

            result.setFieldError(FormOptions.FIO_FIELD_NAME);

        }

        // Validate email field
        if (formData.email.match(new RegExp(FormOptions.EMAIL_PATTERN)) == null) {

            result.setFieldError(FormOptions.EMAIL_FIELD_NAME);

        }

        // Validate phone number
        if (FormOptions.phoneNumbersSum(formData.phone) > FormOptions.PHONE_MAX_NUMBERS_SUM
            || formData.phone.match(new RegExp(FormOptions.PHONE_PATTERN)) == null) {

            result.setFieldError(FormOptions.PHONE_FIELD_NAME);

        }

        return result;

    }

    // Возвращает объект с данными формы, где имена свойств совпадают с именами инпутов
    public getData(): Contact {
       
        let result = new Contact();

        result.fio = (<HTMLInputElement>document.getElementsByName(FormOptions.FIO_FIELD_NAME)[0]).value;
        result.email = (<HTMLInputElement>document.getElementsByName(FormOptions.EMAIL_FIELD_NAME)[0]).value;
        result.phone = (<HTMLInputElement>document.getElementsByName(FormOptions.PHONE_FIELD_NAME)[0]).value;

        return result;

    }

    // Принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.
    public setData(formData: Contact): void {

        (<HTMLInputElement>document.getElementsByName(FormOptions.FIO_FIELD_NAME)[0]).value = formData.fio;
        (<HTMLInputElement>document.getElementsByName(FormOptions.EMAIL_FIELD_NAME)[0]).value = formData.email;
        (<HTMLInputElement>document.getElementsByName(FormOptions.PHONE_FIELD_NAME)[0]).value = formData.phone;

    }

    // Выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена.
    public submit(): void {

        var validationResult = this.validate();

        // Apply results of validation to form
        FormOptions.setFormErrors(validationResult);

        if (validationResult.isValid) {

            this.requestFormResult();

        }

    }

    private requestFormResult() {

        var resultContainer = (<HTMLElement>document.getElementById(FormOptions.RESULT_CONTAINER_ID));
        var submitBtn = (<HTMLElement>document.getElementById(FormOptions.SUBMIT_BUTTON_ID));

        // Clear results
        resultContainer.innerHTML = "";
        resultContainer.classList.remove(FormOptions.SUCCESS_CLASS);
        resultContainer.classList.remove(FormOptions.ERROR_CLASS);
        resultContainer.classList.remove(FormOptions.PROGRESS_CLASS);

        // Get form action
        var formAction = FormOptions.getFormAction();

        this._formResponseService.get(formAction)
            .then(async (formResponse: FormResponse) => {

                switch (formResponse.status) {

                    case FormResponseService.SUCCESS_STATUS: {

                        submitBtn.removeAttribute("disabled");
                        resultContainer.classList.remove(FormOptions.PROGRESS_CLASS);
                        resultContainer.classList.add(FormOptions.SUCCESS_CLASS);
                        resultContainer.innerHTML = "Success";

                        break;

                    }

                    case FormResponseService.ERROR_STATUS: {

                        submitBtn.removeAttribute("disabled");
                        resultContainer.classList.remove(FormOptions.PROGRESS_CLASS);
                        resultContainer.classList.add(FormOptions.ERROR_CLASS);
                        resultContainer.innerHTML = formResponse.reason;

                        break;

                    }

                    case FormResponseService.PROGRESS_STATUS: {

                        submitBtn.setAttribute("disabled", "disabled");
                        resultContainer.classList.add(FormOptions.PROGRESS_CLASS);
                        resultContainer.innerHTML = "Progress";

                        await sleep(formResponse.timeout);

                        this.requestFormResult();

                        break;

                    }
                }

            });

    }

}

export function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

