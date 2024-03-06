import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/authGuard/auth-guard.guard';
import { BacklogComponent } from './backlog/backlog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DraftlistComponent } from './draftlist/draftlist.component';
import { ManycbboComponent } from './manycbbo/manycbbo.component';
import { MisComponent } from './mis/mis.component';
import { MissingreportComponent } from './missingreport/missingreport.component';
import { TargetachievementComponent } from './targetachievement/targetachievement.component';
const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch:'full',
  },
  {
    path:'dashboard',
    canActivate:[AuthGuardGuard],
    data:{role:['Cbbo']},
    component:DashboardComponent
  },
  {
    path:'manycbbo',
    canActivate:[AuthGuardGuard],
    data:{role:['Cbbo']},
    component:ManycbboComponent
  },
  {
    path:'mis',
    canActivate:[AuthGuardGuard],
    data:{role:['Cbbo']},
    component:MisComponent
  },
  {
    path:'draftlist',
    canActivate:[AuthGuardGuard],
    data:{role:['Cbbo']},
    component:DraftlistComponent
  },
  {
    path:'missingreport',
    canActivate:[AuthGuardGuard],
    data:{role:['Cbbo']},
    component:MissingreportComponent
  },
  {
    path:'backlog',
    canActivate:[AuthGuardGuard],
    data:{role:['Cbbo']},
    component:BacklogComponent
  },
  {
    path:'targetachievement',
    canActivate:[AuthGuardGuard],
    data:{role:['Cbbo']},
    component:TargetachievementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CbboRoutingModule { }
