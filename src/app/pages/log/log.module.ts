import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogFormComponent } from './log-form/log-form.component';
import { LogListComponent } from './log-list/log-list.component';
import { MatButtonModule, MatButtonToggleModule, MatDialogModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';
import { DialogLogComponent } from './dialog-log/dialog-log.component';
import { FormsModule } from '@angular/forms';
import { LogResolver } from 'src/app/services/resolvers/log.resolver';
import { LogService } from 'src/app/services/log.service';

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
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LogService,
    LogResolver
  ]
})
export class LogModule { }
