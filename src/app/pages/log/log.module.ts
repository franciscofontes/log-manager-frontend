import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogFormComponent } from './log-form/log-form.component';
import { LogListComponent } from './log-list/log-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogLogComponent } from './dialog-log/dialog-log.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogResolver } from 'src/app/services/resolvers/log.resolver';
import { LogService } from 'src/app/services/log.service';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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

@NgModule({
  declarations: [
    LogListComponent,
    LogFormComponent,
    DialogLogComponent
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
    MatDialogModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    DirectivesModule,
    NgxMaskModule.forRoot()
  ],
  entryComponents: [
    DialogLogComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LogService,
    LogResolver
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogModule { }
