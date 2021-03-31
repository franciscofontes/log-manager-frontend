import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Page } from 'src/app/models/page';
import { LogDTO } from 'src/app/models/log.dto';
import { LogService } from '../log.service';

@Injectable()
export class LogResolver implements Resolve<Observable<Page<LogDTO>>> {
    constructor(
        public service: LogService
    ) { }

    resolve() {
        return this.service.listarPorPagina();
    }
}