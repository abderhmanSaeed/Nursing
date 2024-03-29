import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http/http.service';
import { Observable } from 'rxjs';
import { APIs } from '../../../shared/configs';
import { ApiResponse, UsersResponse } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  getAllUsers(): Observable<ApiResponse<UsersResponse>> {
    return this.httpService.get<ApiResponse<UsersResponse>>(APIs.getAllUsers);
  }
}
