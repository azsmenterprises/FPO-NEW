import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/authGuard/auth-guard.guard';
import { AhoDashboardComponent } from './aho-dashboard/aho-dashboard.component';
import { FpomisComponent } from './fpomis/fpomis.component';
import { FpoprogressComponent } from './fpoprogress/fpoprogress.component';
import { ScoringtoolComponent } from './scoringtool/scoringtool.component';
import { AllocationGradingComponent } from './allocation-grading/allocation-grading.component';
import { SchemeComponentComponent } from './scheme-component/scheme-component.component';
import { ReportComponentComponent } from './report-component/report-component.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full',
  },{
    path:'dashboard',
    canActivate:[AuthGuardGuard],
    data:{role:['AHO']},
    component:AhoDashboardComponent
  },{
    path:'fpomis',
    canActivate:[AuthGuardGuard],
    data:{role:['AHO']},
    component:FpomisComponent
  },{
    path:'fpoprogress',
    canActivate:[AuthGuardGuard],
    data:{role:['AHO']},
    component:FpoprogressComponent
  },{
    path:'scoringtool',
    canActivate:[AuthGuardGuard],
    data:{role:['AHO']},
    component:ScoringtoolComponent
  },{
    path:'allocationgrading',
    canActivate:[AuthGuardGuard],
    data:{role:['AHO']},
    component:AllocationGradingComponent
  },{
    path:'schemecomponent',
    canActivate:[AuthGuardGuard],
    data:{role:['AHO']},
    component:SchemeComponentComponent
  },{
    path:'reportcomponent',
    canActivate:[AuthGuardGuard],
    data:{role:['AHO']},
    component:ReportComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhoRoutingModule { }
