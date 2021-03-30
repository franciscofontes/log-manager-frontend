import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './log.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: LogComponent,
    children: [
      {
        path: '**',
        redirectTo: '/logs',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  declarations: [
    LogComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class LogModule { }
