import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../../core/service/http/http.service';
import { APIs } from '../../../shared/configs';
import { ApiResponse, User } from '../../../shared/models';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpService: HttpService) {}

  signIn(email: string, password: string): Observable<ApiResponse<User>> {
    const body = {
      Email: email,
      Password: password,
    };

    return this.httpService.post<ApiResponse<User>>(APIs.login, body);
  }
}
