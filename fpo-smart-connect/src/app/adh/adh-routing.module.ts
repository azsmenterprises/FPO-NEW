import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/authGuard/auth-guard.guard';
import { AdhDashboardComponent } from './adh-dashboard/adh-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full',
  },{
    path:'dashboard',
    canActivate:[AuthGuardGuard],
    data:{role:['ADH']},
    component:AdhDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdhRoutingModule { }
