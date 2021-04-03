import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AlertService } from '../shared/alert/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(retry(1), catchError((httpError: HttpErrorResponse) => {
      this.handleError(httpError);
      return throwError(httpError);
    }))
  }

  handleError(httpError) {
    let status = "";
    let details = [];
    console.log(httpError);
    console.log(httpError.error);
    switch (httpError.status) {
      case 0:
        status = "Falha ao conectar servidor";
        break;
      case 422:
        status = "(422) - " + httpError.error;
        break;
      default:
        status = "(" + httpError.status + ")";
        if (httpError.error.msg) {
          details.push(httpError.error.msg);
        }
        break;
    }
    this.alertService.error("Ocorreu um erro. " + status, details);
  }

}