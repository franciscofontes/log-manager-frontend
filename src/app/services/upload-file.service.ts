import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    upload(file: File, endpoint:string): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', `${this.baseUrl}/${endpoint}/upload`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }
}