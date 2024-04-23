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
export class HeaderComponent implements OnInit{
   isShowDetails: boolean = true;
   isDropdownVisible = false;
   userInfo: any | null;

  isAuthenticated = this.authService.isAuth();
  selectedLanguage = 'English';

  public flags = [
    { name: 'عربي', image: 'assets/images/flags/sa.svg', lang: 'ar' },
    { name: 'English', image: 'assets/images/flags/gb.svg', lang: 'en' },
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
    }

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();

    // Reset component variables
    this.isAuthenticated = false;
    this.router.navigate([CONFIG.auth.children.login.route.substring(1),]);
    window.location.reload();

  }
  addBodyClass(event:any){
    event.preventDefault();
    document.body.classList.add("open-nav");
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
}
