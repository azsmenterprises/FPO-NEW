import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {rootAdminRoutesModule} from './rootAdmin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FpoUpdateComponent } from './fpo-update/fpo-update.component';
import { RootAdminService } from './root-admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppliedFigsComponent } from './applied-figs/applied-figs.component';
import { SchemeEntryComponent } from './scheme-entry/scheme-entry.component';
import { ActionOnFpoComponent } from './action-on-fpo/action-on-fpo.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { IaCbboMappingComponent } from './ia-cbbo-mapping/ia-cbbo-mapping.component';
import { IaCbboFpoMappingComponent } from './ia-cbbo-fpo-mapping/ia-cbbo-fpo-mapping.component';
import { NotificationComponent } from './notification/notification.component';
import { OverallscenarioComponent } from './dashboard/overallscenario/overallscenario.component';
import { PerformanceprogressComponent } from './dashboard/performanceprogress/performanceprogress.component';
import { TargetvsachievmentComponent } from './dashboard/overallscenario/targetvsachievment/targetvsachievment.component';
import { AnnualturnoverComponent } from './dashboard/overallscenario/annualturnover/annualturnover.component';
import { ShareholderComponent } from './dashboard/overallscenario/shareholder/shareholder.component';
import { SharecapitalComponent } from './dashboard/overallscenario/sharecapital/sharecapital.component';
import { EquitygrantComponent } from './dashboard/overallscenario/equitygrant/equitygrant.component';
import { WomeninboardComponent } from './dashboard/overallscenario/womeninboard/womeninboard.component';
import { ChartsModule } from 'ng2-charts';
import { GovernanceComponent } from './dashboard/performanceprogress/governance/governance.component';
import { BusinessComponent } from './dashboard/performanceprogress/business/business.component';
import { FinanceComponent } from './dashboard/performanceprogress/finance/finance.component';
import { BacklogentryComponent } from './backlogentry/backlogentry.component';
import { BacklogtableComponent } from './backlogtable/backlogtable.component';
import { ConnectbackComponent } from './connectback/connectback.component';





@NgModule({
  declarations: [
    DashboardComponent,
    FpoUpdateComponent,
    AppliedFigsComponent,
    SchemeEntryComponent,
    ActionOnFpoComponent,
    IaCbboMappingComponent,
    IaCbboFpoMappingComponent,
    NotificationComponent,
    OverallscenarioComponent,
    PerformanceprogressComponent,
    TargetvsachievmentComponent,
    AnnualturnoverComponent,
    ShareholderComponent,
    SharecapitalComponent,
    EquitygrantComponent,
    WomeninboardComponent,
    GovernanceComponent,
    BusinessComponent,
    FinanceComponent,
    BacklogentryComponent,
    BacklogtableComponent,
    ConnectbackComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    rootAdminRoutesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatButtonModule,
    ChartsModule,
    // RouterModule.forChild(rootAdminRoutes),

  ],
  providers: [RootAdminService]
})
export class AdminModule { }
