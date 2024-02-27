import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    // Get the authentication token from the AuthService
    const token = this.authService.getToken();


    // Get the current language from TranslationService
    const currentLang = this.authService.getCurrentLanguage();

    // Clone the request and set the necessary headers
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
        'Lang': currentLang || 'en'
      }
    });

    // Log modified headers
    console.log('Modified Headers:', request.headers);

    // Continue with the modified request
    return next.handle(request);
  }

}
