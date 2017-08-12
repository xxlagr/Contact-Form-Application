import { FormResponse } from '../models/form-response';
import { Headers, Http, Response, RequestOptions, HttpModule, XHRBackend, BrowserXhr, ResponseOptions, CookieXSRFStrategy } from '@angular/http';
import { ReflectiveInjector } from '@angular/core';
import 'rxjs/add/operator/toPromise';

export class FormResponseService {

    private _http: Http;

    public static SUCCESS_STATUS = "success";
    public static ERROR_STATUS = "error";
    public static PROGRESS_STATUS = "progress";
    
    constructor() {

        // Using angular Http service outside the app
        let browserXhr: BrowserXhr = new BrowserXhr();
        let baseResponseOptions: ResponseOptions = new ResponseOptions();
        let xsrfStrategy: CookieXSRFStrategy = new CookieXSRFStrategy();
        let backend: XHRBackend = new XHRBackend(browserXhr, baseResponseOptions, xsrfStrategy);
        let requestOptions: RequestOptions = new RequestOptions();
        let http: Http = new Http(backend, requestOptions);
        this._http = http;

    }

    // GET to custom url
    public get(actionUrl: string): Promise<FormResponse> {

        return this._http.get(actionUrl)
            .toPromise()
            .then((response: Response) => response.json() as FormResponse)
            .catch(this.handleError);

    }

    // Handle errors
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}