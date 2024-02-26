import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = moment().year();

  links: any[] = [
    {
      href: 'https://wndo.com/terms-and-conditions/',
      title: 'termsCondition',
    },
    {
      href: 'https://wndo.com/privacy-policy/',
      title: 'privacyPolicy',
    },
    {
      href: '/cookie-policy',
      title: 'Cookie Policy',
    },
    {
      href: '/offer-terms',
      title: 'Offer Terms',
    },
    {
      href: '/sell',
      title: 'Sell with us',
    },
    {
      href: '/infringement',
      title: 'Infringement',
    },
    {
      href: '/security',
      title: 'Security',
    },
  ];

  appsList: any[] = [
    {
      url: environment.mobileAppGooglePlayUrl,
      imagePath: 'assets/images/google-play.svg',
      imageAlt: 'Google Play'
    },
    {
      url: environment.mobileAppIosUrl,
      imagePath: 'assets/images/app-store.svg',
      imageAlt: 'App Store'
    }
  ];
  socialMedia: any[] = [
    {
      href: 'https://youtube.com/@WndoApp',
      title: 'youtube',
      icon: "fa-youtube"
    },
    {
      href: 'https://m.facebook.com/WndoApp/?mibextid=LQQJ4d',
      title: 'facebook',
      icon: "fa-square-facebook"
    },
    {
      href: 'https://twitter.com/wndo_app?s=11&t=cqO0zK5aEhf5wR4R4c-1mQ',
      title: 'twitter',
      icon: "fa-square-x-twitter"
    },
    {
      href: 'https://instagram.com/wndo.app?igshid=MWI4MTIyMDE=',
      title: 'instagram',
      icon: "fa-square-instagram"
    },
  ];

  payments: any[] = [
    {
      title: 'visa',
      icon: "visa-coloring"
    },
    {
      title: 'master card',
      icon: "master-card-coloring"
    },
    {
      title: 'master card',
      icon: "american-express-coloring"
    },
  ];
}
