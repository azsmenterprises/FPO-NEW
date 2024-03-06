import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from '../auth/authGuard/auth-guard.guard';
import { AppliedFarmersComponent } from './applied-farmers/applied-farmers.component';
import { AppliedIndentForSaleComponent } from './produced-aggregator/applied-indent-for-sale/applied-indent-for-sale.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndentSaleComponent } from './produced-aggregator/indent-sale/indent-sale.component';
import { ApprovedByFpoComponent } from './produced-aggregator/approved-by-fpo/approved-by-fpo.component';
import { RejectByFpoComponent } from './produced-aggregator/reject-by-fpo/reject-by-fpo.component';
import { RegisterIndentComponent } from './indent-generation/register-indent/register-indent.component';
import { SubmittedIndentComponent } from './indent-generation/submitted-indent/submitted-indent.component';
import { IndentApprovedByFpoComponent } from './indent-generation/indent-approved-by-fpo/indent-approved-by-fpo.component';
import { IndentRejectedByFpoComponent } from './indent-generation/indent-rejected-by-fpo/indent-rejected-by-fpo.component';
import { ForwardToFpoComponent } from './produced-aggregator/forward-to-fpo/forward-to-fpo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
    component: DashboardComponent,
  },
  {
    path: 'applied-farmers',
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
    component: AppliedFarmersComponent,
  },
  {
    path: 'register-produced',
    component: IndentSaleComponent,
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
  },
  {
    path: 'submitted-produced',
    component: AppliedIndentForSaleComponent,
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
  },
  {
    path: 'approved-by-fpo',
    component: ApprovedByFpoComponent,
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
  },
  {
    path: 'rejected-by-fpo',
    component: RejectByFpoComponent,
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
  },
  {
    path: 'register-indent',
    component: RegisterIndentComponent,
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
  },
  {
    path: 'submitted-indent',
    component: SubmittedIndentComponent,
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
  },
  {
    path: 'indent-approved-by-fpo',
    component: IndentApprovedByFpoComponent,
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
  },
  {
    path: 'indent-rejected-by-fpo',
    component: IndentRejectedByFpoComponent,
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FIG'] },
  },
  {
    path:'forward-to-fpo',
    component:ForwardToFpoComponent,
    canActivate:[AuthGuardGuard],
    data:{ role:[ 'FIG'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FigLayoutRoutingModule {}
