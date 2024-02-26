import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-switch-language',
  templateUrl: './switch-language.component.html',
  styleUrl: './switch-language.component.scss'
})
export class SwitchLanguageComponent implements OnInit {
  isDropdownVisible = false;
  selectedLanguage = 'English';

  public flags = [
    { name: 'عربي', image: 'assets/images/flags/sa.svg', lang: 'ar' },
    { name: 'English', image: 'assets/images/flags/gb.svg', lang: 'en' },
  ];

  public flag: any = this.flags[0];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public translate: TranslateService,

  ) { }
  ngOnInit(): void {

    this.setLanguageOnInit();
  }
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;

    if (this.isDropdownVisible) {
      const buttonElement = this.elementRef.nativeElement.querySelector('#changeLangButton');
      const dropdownElement = this.elementRef.nativeElement.querySelector('#dropdown');

      // Get the button's position relative to the viewport
      const buttonRect = buttonElement.getBoundingClientRect();

      // Set styles for the dropdown using Renderer2
      this.renderer.setStyle(dropdownElement, 'position', 'absolute');
      this.renderer.setStyle(dropdownElement, 'top', `${buttonRect.bottom + window.scrollY}px`);
      this.renderer.setStyle(dropdownElement, 'left', `${buttonRect.left + window.scrollX}px`);
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedElement = event.target as HTMLElement;

    // Check if the clicked element is outside the dropdown
    if (!this.elementRef.nativeElement.contains(clickedElement)) {
      this.isDropdownVisible = false;
    }
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
  lang: any;
  setLanguageOnInit() {
    // Check if the language is stored in localStorage
    const storedLang = localStorage.getItem('lang');
    if (storedLang == 'ar') {
      this.translate.use('ar');
      localStorage.setItem('lang', 'ar');
      document.documentElement.setAttribute('data-lang', 'ar');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      this.lang = 'ar';
      this.selectedLanguage = 'عربي';

      document
        .querySelector('.ar-stylesheet')
        ?.setAttribute('href', '/assets/css/ar-style.css');
      this.flag = this.flags[0];

      // this.api.lang.next(this.lang);
    } else {
      this.translate.use('en');
      localStorage.setItem('lang', 'en');
      document.documentElement.setAttribute('data-lang', 'en');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      this.lang = 'en';
      this.selectedLanguage = 'English';

      document.querySelector('.ar-stylesheet')?.setAttribute('href', ' ');

      this.flag = this.flags[1];
      // this.api.lang.next(this.lang);
    }
  }

}

