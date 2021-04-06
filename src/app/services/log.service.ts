import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Log } from '../models/log';
import { LogEstatistica } from '../models/log-estatistica.model';
import { LogFiltro } from '../models/log-filtro.model';
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
    filtro:LogFiltro,
    page?: number,
    lines?: number,
    orderBy?: string,
    direction?: string
  ): Observable<Page<LogDTO>> {
    let params = new HttpParams();
    if (filtro.de) {
      params = params.append('de', filtro.de.trim().toString());
      params = params.append('ate', filtro.ate.trim().toString());
    }     
    if (filtro.ip) {
      params = params.append('ip', filtro.ip.trim());
    }     
    if (filtro.status) {
      params = params.append('status', filtro.status.trim());
    }     
    if (filtro.request) {
      params = params.append('request', filtro.request.trim());
    }     
    if (filtro.userAgent) {
      params = params.append('userAgent', filtro.userAgent.trim());
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
      `${this.baseUrl}/${this.endpoint}/search`,
      { params }
    );
  }  

  buscarQuantidadeLogs(): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/${this.endpoint}/quant`
    );
  }   

  buscarQuantidadeIpsUnicos(): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/${this.endpoint}/quantIps`
    );
  } 
  
  buscarQuantidadeUserAgentsUnicos(): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/${this.endpoint}/quantUserAgents`
    );
  }   

  listarIpsUnicos(): Observable<String[]> {
    return this.http.get<String[]>(
      `${this.baseUrl}/${this.endpoint}/ips`
    );
  }  

  listarUserAgentsUnicos(): Observable<String[]> {
    return this.http.get<String[]>(
      `${this.baseUrl}/${this.endpoint}/userAgents`
    );
  }   

  listarEstatisticasPorIp(ip:string): Observable<LogEstatistica[]> {
    let params = new HttpParams();
    if (ip) {
      params = params.append('ip', ip.trim());
    }
    return this.http.get<LogEstatistica[]>(
      `${this.baseUrl}/${this.endpoint}/estatisticasPorIp`,
      { params }
    );
  }
}
