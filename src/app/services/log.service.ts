import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API_CONFIG } from '../config/api.config';
import { LogDTO } from '../models/log.dto';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  listar() : Observable<LogDTO[]> {
    return this.http.get<LogDTO[]>(`${API_CONFIG.baseUrl}/logs`);
  }
}
