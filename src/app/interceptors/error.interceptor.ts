import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public snackBar: MatSnackBar) {
    }    

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(retry(1), catchError((httpError: HttpErrorResponse) => {
    
          if (!httpError.status) {
            let error = httpError.error;
            error = JSON.parse(error);
          }
    
          switch (httpError.status) {
            case 401:
              this.handle401();
              break;
    
              case 403:
              this.handle403();
              break;
    
              case 422:
              this.handle422(httpError);
              break;
    
              default:
              this.handleDefaultEror(httpError);
          }
    
          return throwError(httpError);
        }))        
      }

      handle401() {
        this.openSnackBar('E-mail ou senha inválidos', 'Falha na autenticação');
      }
    
      handle422(httpError) {
        let msg = httpError.errors;
        this.openSnackBar(msg, 'Validação');
      }
    
      handle403() {
        console.log("Acesso negado!");
      }
    
      handleDefaultEror(httpError) {
        this.openSnackBar(httpError.message, 'Erro ' + httpError.status);
      }      

      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 4000,
          verticalPosition: 'top',
          direction: 'ltr',
          panelClass: 'snackbar-alerta'
        });
      }      
}