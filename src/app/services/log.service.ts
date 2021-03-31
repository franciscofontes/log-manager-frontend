import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LogDTO } from '../models/log.dto';
import { Page } from '../models/page';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class LogService extends GenericService<LogDTO> {

  constructor(public http: HttpClient) {
    super(http, 'logs');
  }

  listarPorFiltro(
    data?: Date,
    ip?: string,
    status?: string,
    request?: string,
    userAgent?: string,
    page?: number,
    lines?: number,
    orderBy?: string,
    direction?: string
  ): Observable<Page<LogDTO>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (lines) {
      params = params.append('lines', lines.toString());
    }
    if (orderBy) {
      params = params.append('orderBy', orderBy);
    }
    if (direction) {
      params = params.append('direction', direction.toUpperCase());
    }
    return this.http.get<Page<LogDTO>>(
      `${this.baseUrl}/logs/search`,
      { params }
    );
  }  

}
