import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { CONFIG } from '../../shared/configs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isShowDetails: boolean = true;
  isDropdownVisible = false;
  userInfo: any | null;

  isAuthenticated = this.authService.isAuth();
  // selectedLanguage = 'English';

  public flags = [
    { name: 'عربي', image: 'assets/images/flags/sa.svg', lang: 'ar' },
    { name: 'English', image: 'assets/images/flags/gb.svg', lang: 'en' },
  ];
  selectedLanguage: string = 'en'; // Default language

  languages = [
    { name: 'English', code: 'en' },
    { name: 'Belgian', code: 'be' },
    { name: 'Arabic', code: 'ar' }
    // Add more languages as needed
  ];

  public flag: any = this.flags[0];
  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService,

  ) {
    // debugger;
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.setLanguageOnInit();

  }

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();

    // Reset component variables
    this.isAuthenticated = false;
    this.router.navigate([CONFIG.auth.children.login.route.substring(1),]);
    window.location.reload();

  }
  addBodyClass(event: any) {
    event.preventDefault();
    document.body.classList.add("open-nav");
  }

  changeLanguage(code: string) {
    if (code == 'en') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.documentElement.setAttribute('data-lang', 'en');
      document.querySelector('.ar-stylesheet')?.setAttribute('href', '');
      this.selectedLanguage = code;
    } else if (code == 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.documentElement.setAttribute('data-lang', 'ar');
      document
        .querySelector('.ar-stylesheet')
        ?.setAttribute('href', '/assets/css/ar-style.css');
      this.selectedLanguage = code;
    }
    else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'be';
      document.documentElement.setAttribute('data-lang', 'be');
      document.querySelector('.ar-stylesheet')?.setAttribute('href', '');
      this.selectedLanguage = code;
    }
    this.translate.use(code);
    localStorage.setItem('lang', code);
    window.location.reload();

    // Implement logic to change the language based on the selected code
    // For example, you can use a translation service or set a language variable
    console.log('Selected language code:', code);
    // Implement your logic here
  }

  handleLanguageSelection(flag: any, lang: any) {
    if (lang == 'en') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.documentElement.setAttribute('data-lang', 'en');
      // this.spinner.show();
      document.querySelector('.ar-stylesheet')?.setAttribute('href', '');
      this.selectedLanguage = flag.name;
    } else {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.documentElement.setAttribute('data-lang', 'ar');
      document
        .querySelector('.ar-stylesheet')
        ?.setAttribute('href', '/assets/css/ar-style.css');
      this.selectedLanguage = flag.name;

    }
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
    // Perform language-specific action here
    console.log(`Selected language: ${lang}`);

    // Close the dropdown after language selection
    this.isDropdownVisible = false;
  }

  setLanguageOnInit() {
    // Check if the language is stored in localStorage
    const storedLang = localStorage.getItem('lang');
    if (storedLang == 'ar') {
      this.translate.use('ar');
      localStorage.setItem('lang', 'ar');
      document.documentElement.setAttribute('data-lang', 'ar');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      this.selectedLanguage = 'ar';

      document
        .querySelector('.ar-stylesheet')
        ?.setAttribute('href', '/assets/css/ar-style.css');

    } else if (storedLang == 'en') {
      this.translate.use('en');
      localStorage.setItem('lang', 'en');
      document.documentElement.setAttribute('data-lang', 'en');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      this.selectedLanguage = 'en';

      document.querySelector('.ar-stylesheet')?.setAttribute('href', ' ');

    }
    else {
      this.translate.use('be');
      localStorage.setItem('lang', 'be');
      document.documentElement.setAttribute('data-lang', 'be');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'be';
      this.selectedLanguage = 'be';

      document.querySelector('.ar-stylesheet')?.setAttribute('href', ' ');
    }
  }
}
