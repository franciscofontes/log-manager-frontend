import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loading = new Subject<boolean>();

  onLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
