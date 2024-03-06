import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/authGuard/auth-guard.guard';
// import { TargetComponent } from './target/target.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { FpotargetsComponent } from './target/fpotargets/fpotargets.component';
import { OperationaltargetsComponent } from './target/operationaltargets/operationaltargets.component';
import { FpoCbboTargetsComponent } from './target/fpo-cbbo-targets/fpo-cbbo-targets.component';
const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full',
  },
  {
    path:'dashboard',
    canActivate:[AuthGuardGuard],
    data:{role:['ia']},
    component:DashboardComponent
  },
  {
    path:'set-fpo-targets',
    canActivate:[AuthGuardGuard],
    data:{role:['ia']},
    component:FpotargetsComponent
  },
  {
    path:'set-fpo-cbbo-targets',
    canActivate:[AuthGuardGuard],
    data:{role:['ia']},
    component:FpoCbboTargetsComponent
  },
  {
    path:'set-operational-targets',
    canActivate:[AuthGuardGuard],
    data:{role:['ia']},
    component:OperationaltargetsComponent
  },
  {
    path:'table',
    canActivate:[AuthGuardGuard],
    data:{role:['ia']},
    component:TableComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IaRoutingModule { }
