import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';

@Injectable({ 
    providedIn: 'root' 
})
export class AlertService {

    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    success(message: string, details:any[], options?: any) {
        let icon = "done";
        this.alert(new Alert({ ...options, type: AlertType.Success, message, details, icon }));
    }

    error(message: string, details:any[], options?: any) {
        let icon = "error";
        this.alert(new Alert({ ...options, type: AlertType.Error, message, details, icon }));
    }

    info(message: string, details:any[], options?: any) {
        let icon = "info";
        this.alert(new Alert({ ...options, type: AlertType.Info, message, details, icon }));
    }

    warn(message: string, details:any[], options?: any) {
        let icon = "warning";
        this.alert(new Alert({ ...options, type: AlertType.Warning, message, details, icon }));
    }

    alert(alert: Alert) {
        this.clear(alert.id);
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}