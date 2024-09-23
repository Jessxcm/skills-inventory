import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { FormlyConfigModule } from './formly-config.module';
import { RoutesModule } from './routes/routes.module';

import { appInitializerProviders, BASE_URL, httpInterceptorProviders } from '@core';
import { environment } from '@env/environment';

import { TokenTestInterceptor } from '@core/interceptors/token-test.interceptor';
import { InMemDataService } from '@shared/in-mem/in-mem-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AuthApplication } from './routes/auth/application/auth.application';
import { StorageApplication } from './routes/auth/application/storage-application';
import { AuthModule } from './routes/auth/auth.module';
import { AuthInfrastructure } from './routes/auth/infrastructure/auth.infrastructure';
import { StorageInfrastructure } from './routes/auth/infrastructure/storage-infrastructure';
import { CollaboratorApplication } from './routes/collaborators/application/collaborator-application';
import { CollaboratorInfrastructure } from './routes/collaborators/infrastructure/collaborator-infrastructure';
import { MedicApplication } from './routes/medics/application/medic-application';
import { MedicInfrastructure } from './routes/medics/infrastructure/medic-infrastructure';
import { ProfileLayoutComponent } from './routes/profile/layout/layout.component';
import { ProjectApplication } from './routes/projects/application/project-application';
import { ProjectInfrastructure } from './routes/projects/infrastructure/project-infrastructure';
import { SkillApplication } from './routes/skills/application/skill-application';
import { SkillInfrastructure } from './routes/skills/infrastructure/skill-infrastructure';
import { UserApplication } from './routes/users/application/user-application';
import { UserInfrastructure } from './routes/users/infrastructure/user-infrastructure';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { RoleApplication } from './routes/roles/application/role-application';
import { RoleInfrastructure } from './routes/roles/infrastructure/role-infrastructure';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Declaro constantes para los keys de la API
const RECAPTCHA_V2_DUMMY_KEY = environment.recaptchaKey;

// Declaron constantes para los providers
const application = [
  AuthApplication,
  StorageApplication,
  CollaboratorApplication,
  ProjectApplication,
  MedicApplication,
  SkillApplication,
  UserApplication,
  RoleApplication,
];

const infrastructure = [
  AuthInfrastructure,
  StorageInfrastructure,
  CollaboratorInfrastructure,
  ProjectInfrastructure,
  MedicInfrastructure,
  SkillInfrastructure,
  UserInfrastructure,
  RoleInfrastructure,
];
const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenTestInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    ThemeModule,
    RoutesModule,
    SharedModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // Demo purposes only for GitHub Pages
    HttpClientInMemoryWebApiModule.forRoot(InMemDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
    }),
  ],
  providers: [
    { provide: ProfileLayoutComponent, useClass: ProfileLayoutComponent, multi: true },
    { provide: BASE_URL, useValue: environment.baseUrl },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: RECAPTCHA_V2_DUMMY_KEY,
      } as RecaptchaSettings,
    },
    httpInterceptorProviders,
    appInitializerProviders,
    ...application,
    ...infrastructure,
    /* ...interceptors, */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
