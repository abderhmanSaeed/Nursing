import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../../../shared/configs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _HttpClient: HttpClient) {}


  get<T>(path: string, params: any = new HttpParams()): Observable<any> {
    return this._HttpClient.get<T>(`${APIs.APIsBaseURL}${path}`, { params });
  }


  post<T>(path: string, body: Object = {}, headers?: any): Observable<T> {
    return this._HttpClient.post<T>(`${APIs.APIsBaseURL}${path}`, body, {
      headers,
      withCredentials: true,
    });
  }


  postByParams(path: string, params: any = new HttpParams(), payload? : any): Observable<any> {
    return this._HttpClient.post(`${APIs.APIsBaseURL}${path}`, payload, { params });
  }


  delete(path: string, params: any = new HttpParams()): Observable<any> {
    return this._HttpClient.delete(`${APIs.APIsBaseURL}${path}`, { params });
  }


  put(path: string, body: Object = {}, params: any = new HttpParams()): Observable<any> {
    return this._HttpClient.put(`${APIs.APIsBaseURL}${path}`, body, { params });
  }

  download<T>(path: string): Observable<any> {
    return this._HttpClient.get<T>(path, {
     responseType:'blob' as 'json'
    });
  }

}
