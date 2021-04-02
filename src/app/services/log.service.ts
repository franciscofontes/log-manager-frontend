import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Log } from '../models/log';
import { LogDTO } from '../models/log.dto';
import { Page } from '../models/page';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class LogService extends GenericService<Log, LogDTO> {

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
    if (data) {
      params = params.append('data', data.toString());
    }     
    if (ip) {
      params = params.append('ip', ip.trim());
    }     
    if (status) {
      params = params.append('status', status.trim());
    }     
    if (request) {
      params = params.append('request', request.trim());
    }     
    if (userAgent) {
      params = params.append('userAgent', userAgent.trim());
    }    
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
