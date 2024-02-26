import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SwitchLanguageComponent } from './components/switch-language/switch-language.component';
import { TranslationService } from '../data/service/translation/translation.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SwitchLanguageComponent
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
    TranslateModule,
  ],
  providers: [
    TranslationService,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
