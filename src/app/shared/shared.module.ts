import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SwitchLanguageComponent } from './components/switch-language/switch-language.component';
import { TranslationService } from '../data/service/translation/translation.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputPasswordComponent } from './components/inputs/input-password/input-password.component';
import { InputFiledComponent } from './components/inputs/input-filed/input-filed.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TokenInterceptor } from '../core/interceptors/auth-interceptor/token.interceptor';
import { AuthInterceptorService } from '../core/interceptors/response-interceptor/auth-interceptor.service';
import { LoaderInterceptor } from '../core/interceptors/loader-interceptor/loader.interceptor';
import { IsEmptyComponent } from './components/is-empty/is-empty.component';



@NgModule({
  declarations: [
    SwitchLanguageComponent,
    InputPasswordComponent,
    InputFiledComponent,
    LoadingComponent,
    IsEmptyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
    HttpClientModule,
    TranslateModule,



  ],
  exports: [SwitchLanguageComponent,
    CommonModule,
    TranslateModule,
    InputPasswordComponent,
    InputFiledComponent,
    LoadingComponent,
    FormsModule,
    ReactiveFormsModule,
    IsEmptyComponent
  ],
  providers: [
    TranslationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
