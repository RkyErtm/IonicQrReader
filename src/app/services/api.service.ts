import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Login, Register } from "../models/register";


@Injectable({ providedIn: 'root' })
export class ApiService {
    apiUrl: string = environment.apiUrl;
    constructor(injector: Injector,
        private httpClient: HttpClient) { }

    // getAnnouncement(id: any): Observable<any[] | CommonError> {
    //     const url = `${this.path}QrcodeAPI/GetList?typeId=${id}&languageId=1`;
    //     return this.httpClient
    //       .get<any[]>(url)
    //       .pipe(catchError(this.commonHttpErrorService.handleError));
    //   }

    generateQr(title?: any, userId?: number | any): Observable<any> {
        const url = `${this.apiUrl}QrcodeAPI/Generate`;
        return this.httpClient.post<any>(url, {
            userId: userId,
            title: title
        }).pipe(catchError(this.handleError));
    }

    register(data: Register): Observable<any> {
        const url = `${this.apiUrl}AuthAPI/Register`;
        return this.httpClient.post<any>(url, data).pipe(catchError(this.handleError));
    }

    login(data: Login): Observable<any> {
        const url = `${this.apiUrl}AuthAPI/Login`;
        return this.httpClient.post<any>(url, data).pipe(catchError(this.handleError));
    }

    getListQrCode(userId: number): Observable<any> {
        const url = `${this.apiUrl}QrcodeAPI/GetList?userId=${userId}`;
        return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
    }

    deleteQrCode(codeId?: number): Observable<any> {
        const url = `${this.apiUrl}QrcodeAPI/Delete?id=${codeId}`;
        return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
    }

    handleError(httpErrorResponse: HttpErrorResponse): Observable<any> {
        const customError: any = {
            statusText: httpErrorResponse.statusText,
            code: httpErrorResponse.status,
            messages: httpErrorResponse.error.messages,
            friendlyMessage: 'Error from service',
            error: httpErrorResponse.error
        };
        console.error(httpErrorResponse);
        return throwError(customError);
    }
}
