import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FormatterHelper {
    
    DATA_BR = "dd/MM/yyyy HH:mm:ss";
    DATA = "yyyy-MM-dd";
    DATA_HORA = "yyyy-MM-dd HH:mm:ss.SSS"
    HORA = "HH:mm:ss.SSS"

    IP_REGEX = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    STATUS_REGEX = /1\d\d|2\d\d|3\d\d|4\d\d|5\d\d/;
    HORA_GEREX = /^[0-2][0-3]:[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]$/;
}