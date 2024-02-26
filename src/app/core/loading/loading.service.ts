import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // private loadingSubject = new BehaviorSubject<boolean>(false);
  // private activeRequests = 0;

  // public loading$ = this.loadingSubject.asObservable();

  // begin() {
  //   this.activeRequests++;
  //   if (this.activeRequests === 1) {
  //     this.loadingSubject.next(true);
  //   }
  // }

  // end() {
  //   this.activeRequests--;
  //   if (this.activeRequests === 0) {
  //     this.loadingSubject.next(false);
  //   }
  // }
}
