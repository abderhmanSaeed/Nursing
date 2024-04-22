import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http/http.service';
import { Observable } from 'rxjs';
import { APIs } from '../../../shared/configs';
import { ApiResponse, RequestResponse } from '../../../shared/models';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private httpService: HttpService) { }

  getMyRequests(tenantId: string): Observable<ApiResponse<RequestResponse>> {
    const url = `${APIs.getAllRequests}?tenantId=${tenantId}&pageNumber=${1}&pazeSize=${10}`;
    return this.httpService.get<ApiResponse<RequestResponse>>(url);
  }

  getAllRequests(tenantId: string): Observable<ApiResponse<RequestResponse>> {
    const url = `${APIs.getAllRequests}?tenantId=${tenantId}&pageNumber=${1}&pazeSize=${10}`;
    return this.httpService.get<ApiResponse<RequestResponse>>(url);
  }

  loadRequests(tenantId: string, pageNumber: number, pazeSize: number): Observable<ApiResponse<RequestResponse>> {
    const url = `${APIs.getAllRequests}?tenantId=${tenantId}&pageNumber=${pageNumber}&pazeSize=${pazeSize}`;
    return this.httpService.get<ApiResponse<RequestResponse>>(url);
  }

  addRequest(request: any) {
    return this.httpService.post(APIs.getAllRequests, request);
  }
  editRequest(request: any) {
    return this.httpService.put(APIs.getAllRequests, request);
  }
}
