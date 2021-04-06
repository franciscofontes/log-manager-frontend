import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogFormComponent } from './log-form/log-form.component';
import { LogListComponent } from './log-list/log-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogResolver } from 'src/app/services/resolvers/log.resolver';
import { LogService } from 'src/app/services/log.service';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LogUploadComponent } from './log-upload/log-upload.component';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { PaginatorBR } from 'src/app/shared/paginator/paginator-br.model';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const routes: Routes = [
  {
    path: 'form/:id',
    component: LogFormComponent
  },
  {
    path: 'form',
    component: LogFormComponent
  },
  {
    path: 'upload',
    component: LogUploadComponent
  },
  {
    path: '',
    component: LogListComponent,
    resolve: { page: LogResolver },
    children: [
      {
        path: '**',
        redirectTo: '/logs',
        pathMatch: 'full'
      }
    ]
  }
];

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

export const DateFormats = {
  parse: {
      dateInput: ['YYYY-MM-DD']
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    LogListComponent,
    LogFormComponent,
    LogUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    DirectivesModule,
    NgxMaskModule.forRoot()
  ],
  entryComponents: [
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LogService,
    LogResolver,
    UploadFileService,
    { provide: MatPaginatorIntl, useClass: PaginatorBR },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats }    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogModule { }
