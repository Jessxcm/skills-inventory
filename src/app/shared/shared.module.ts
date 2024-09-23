import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MaterialExtensionsModule } from './material-extensions.module';
import { MaterialModule } from './material.module';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { ToastrModule } from 'ngx-toastr';

import { WebcamModule } from 'ngx-webcam';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ErrorCodeComponent } from './components/error-code/error-code.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PhotoComponent } from './components/photo/photo.component';
import { TableComponent } from './components/table/table.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { UploadDirective } from './directives/upload.directive';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ToObservablePipe } from './pipes/to-observable.pipe';
const MODULES: any[] = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  DragDropModule,
  MaterialModule,
  MaterialExtensionsModule,
  FormlyModule,
  FormlyMaterialModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
  NgxPermissionsModule,
  ToastrModule,
  TranslateModule,
  NgOptimizedImage,
  WebcamModule,
];
const COMPONENTS: any[] = [
  BreadcrumbComponent,
  PageHeaderComponent,
  ErrorCodeComponent,
  TableComponent,
  PaginatorComponent,
  ConfirmComponent,
  LoaderComponent,
  PhotoComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [DisableControlDirective, UploadDirective];
const PIPES: any[] = [SafeUrlPipe, ToObservablePipe];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {}
