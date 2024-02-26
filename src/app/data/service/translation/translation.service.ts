// translation.service.ts

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {}

  init() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  translateText(key: string): string {
    return this.translate.instant(key);
  }
  getCurrentLanguage(): string | null  {
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
