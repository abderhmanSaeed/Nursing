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
      href: 'termsCondition',
      title: 'termsCondition',
    },
    {
      href: 'privacyPolicy',
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
      href: '',
      title: 'youtube',
      icon: "fa-youtube"
    },
    {
      href: '',
      title: 'facebook',
      icon: "fa-square-facebook"
    },
    {
      href: '',
      title: 'twitter',
      icon: "fa-square-x-twitter"
    },
    {
      href: '',
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
