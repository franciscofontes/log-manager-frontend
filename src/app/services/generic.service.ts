import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entidade } from '../models/entidade';
import { Page } from '../models/page';

export abstract class GenericService<T extends Entidade> {

  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient, public endpoint: string) { }

  listar(): Observable<T[]> {
    return this.http.get<T[]>(
      `${this.baseUrl}/${this.endpoint}`
    );
  }

  buscarPeloId(id: number): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}/${this.endpoint}/${id}`
    );
  }

  listarPorPagina(
    page?: number,
    lines?: number,
    orderBy?: string,
    direction?: string
  ): Observable<Page<T>> {
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
    return this.http.get<Page<T>>(
      `${this.baseUrl}/${this.endpoint}/page`,
      { params }
    );
  }

  adicionar(entidade: T) {
    return this.http.post(
      `${this.baseUrl}/${this.endpoint}`,
      entidade,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  editar(entidade: T) {
    return this.http.put(
      `${this.baseUrl}/${this.endpoint}/${entidade.id}`,
      entidade,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  remover(entidade: T) {
    return this.http.delete(
      `${this.baseUrl}/${this.endpoint}/${entidade.id}`
    );
  }

}
