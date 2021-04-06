import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path : 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path : 'logs', loadChildren: () => import('./pages/log/log.module').then(m => m.LogModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
