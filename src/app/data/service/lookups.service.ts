import { Injectable } from '@angular/core';
import { APIs } from '../../shared/configs';
import { Observable } from 'rxjs';
import { ApiResponse, Lookup } from '../../shared/models';
import { HttpService } from '../../core/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(private httpService: HttpService) { }

  getAllRoles(tenantId: string): Observable<ApiResponse<Lookup[]>> {
    const url = `${APIs.getAllRoles}?tenantId=${tenantId}`;

    return this.httpService.get<ApiResponse<Lookup[]>>(url);
  }

  getAllServices(tenantId: string): Observable<ApiResponse<Lookup[]>> {
    const url = `${APIs.getAllServices}?tenantId=${tenantId}`;

    return this.httpService.get<ApiResponse<Lookup[]>>(url);
  }

  getAllShifts(tenantId: string): Observable<ApiResponse<Lookup[]>> {
    const url = `${APIs.getAllShifts}?tenantId=${tenantId}`;

    return this.httpService.get<ApiResponse<Lookup[]>>(url);
  }

  getAllPatients(tenantId: string): Observable<ApiResponse<Lookup[]>> {
    const url = `${APIs.getAllPatients}?tenantId=${tenantId}`;

    return this.httpService.get<ApiResponse<Lookup[]>>(url);
  }
}
