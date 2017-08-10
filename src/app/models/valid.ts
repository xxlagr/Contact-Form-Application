export class Valid {
    
    public isValid: boolean;
    public errorFields: string[];

    constructor() {

        this.isValid = true;
        this.errorFields = [];

    }

    public setFieldError(fieldName: string): void {

        if(fieldName != undefined && fieldName.length > 0) {

            this.isValid = false;
            this.errorFields.push(fieldName);
            
        }

    }

}