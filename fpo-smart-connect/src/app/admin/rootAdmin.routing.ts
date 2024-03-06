import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/authGuard/auth-guard.guard';
import { AppliedFigsComponent } from './applied-figs/applied-figs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FpoUpdateComponent } from './fpo-update/fpo-update.component';
import { NgModule } from '@angular/core';
import { SchemeEntryComponent } from './scheme-entry/scheme-entry.component';
import { ActionOnFpoComponent } from './action-on-fpo/action-on-fpo.component';
import { IaCbboMappingComponent } from './ia-cbbo-mapping/ia-cbbo-mapping.component';
import { IaCbboFpoMappingComponent } from './ia-cbbo-fpo-mapping/ia-cbbo-fpo-mapping.component';
import { NotificationComponent } from './notification/notification.component';
import { OverallscenarioComponent } from './dashboard/overallscenario/overallscenario.component';
import { PerformanceprogressComponent } from './dashboard/performanceprogress/performanceprogress.component';
import { AnnualturnoverComponent } from './dashboard/overallscenario/annualturnover/annualturnover.component';
import { EquitygrantComponent } from './dashboard/overallscenario/equitygrant/equitygrant.component';
import { SharecapitalComponent } from './dashboard/overallscenario/sharecapital/sharecapital.component';
import { ShareholderComponent } from './dashboard/overallscenario/shareholder/shareholder.component';
import { TargetvsachievmentComponent } from './dashboard/overallscenario/targetvsachievment/targetvsachievment.component';
import { WomeninboardComponent } from './dashboard/overallscenario/womeninboard/womeninboard.component';
import { BusinessComponent } from './dashboard/performanceprogress/business/business.component';
import { FinanceComponent } from './dashboard/performanceprogress/finance/finance.component';
import { GovernanceComponent } from './dashboard/performanceprogress/governance/governance.component';
import { BacklogentryComponent } from './backlogentry/backlogentry.component';
import { BacklogtableComponent } from './backlogtable/backlogtable.component';
import { ConnectbackComponent } from './connectback/connectback.component';

const rootAdminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    {
        path:'dashboard',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:DashboardComponent
    },
    {
        path:'overallscenario',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:OverallscenarioComponent
    },
    {
        path:'performanceprogress',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:PerformanceprogressComponent
    },
    {
        path:'fpo-update',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:FpoUpdateComponent
    },
    {
        path:'applied-fig',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:AppliedFigsComponent
    },
    {
        path:'scheme-entry',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:SchemeEntryComponent
    },
    {
        path:'actionOnFpo',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:ActionOnFpoComponent
    },
    {
        path:'notification',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:NotificationComponent
    },
    {
        path:'iacbbomapping',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:IaCbboMappingComponent
    },
    {
        path:'iacbbofpomapping',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:IaCbboFpoMappingComponent
    },
    {
        path:'annualturnover',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:AnnualturnoverComponent
    },
    {
        path:'equitygrant',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:EquitygrantComponent
    },
    {
        path:'sharecapital',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:SharecapitalComponent
    },
    {
        path:'shareholder',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:ShareholderComponent
    },
    {
        path:'targetvsachievement',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:TargetvsachievmentComponent
    },
    {
        path:'womeninboard',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:WomeninboardComponent
    },
    {
        path:'business',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:BusinessComponent
    },
    {
        path:'finance',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:FinanceComponent
    },
    {
        path:'governance',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:GovernanceComponent
    }, 
    {
        path:'backlogentry',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:BacklogentryComponent
    },
    {
        path:'backlogtable',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:BacklogtableComponent
    },
    {
        path:'connectback',
        canActivate:[AuthGuardGuard],
        data:{role:['Admin']},
        component:ConnectbackComponent
    }
    
]

@NgModule({
    imports: [RouterModule.forChild(rootAdminRoutes)],
    exports: [RouterModule],
  })
  export class rootAdminRoutesModule {}