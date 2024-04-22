import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private setShowLoginMessageSubject = new BehaviorSubject<boolean>(false);

  private userNameSubject = new BehaviorSubject<string | null>(null);
  private phoneNumberSubject = new BehaviorSubject<string | null>(null);
  private phoneCodeSubject = new BehaviorSubject<string | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  setShowLoginMessage$ = this.setShowLoginMessageSubject.asObservable();

  userName$ = this.userNameSubject.asObservable();
  phoneNumber$ = this.phoneNumberSubject.asObservable();
  phoneCode$ = this.phoneCodeSubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  constructor() { }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  setUserName(userName: string | null): void {
    this.userNameSubject.next(userName);
  }
  setShowLoginMessage(setShowLoginMessage: boolean): void {
    this.setShowLoginMessageSubject.next(setShowLoginMessage);
  }
  setPhoneNumber(phoneName: string | null): void {
    this.phoneNumberSubject.next(phoneName);
  }
  setPhoneCode(phoneCode: string | null): void {
    this.phoneCodeSubject.next(phoneCode);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getUserInfo(): any | null {
    try {
      const user_infoLocalStorage = localStorage?.getItem('user_info');
      if (user_infoLocalStorage) {
        const userInfo = JSON.parse(user_infoLocalStorage);
        return userInfo;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    return null;
  }

  getToken(): string | null {
    try {
      const tokenLocalStorage = localStorage?.getItem('token');
      return tokenLocalStorage || null;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  }

  setRefreshToken(token: string): void {
    return localStorage.setItem('refresh_token', token);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
    localStorage.removeItem('token_expiration');
  }
  // Add a method to clear the token
  clearToken(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
  isAuth(): boolean {
    // Check if access token is present in local storage
    const accessToken = localStorage.getItem('token');

    // Return true if access token is present, indicating the user is authenticated
    return !!accessToken;
  }

  getCurrentLanguage(): string | null {
    try {
      const currentLang = localStorage.getItem('lang');
      return currentLang || 'en';
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return 'en';
    }

    // console.log('Current Language:', localStorage.getItem('lang'));

    // return localStorage.getItem('lang') || 'en'; // Default to 'en' if no language is set
  }
}
