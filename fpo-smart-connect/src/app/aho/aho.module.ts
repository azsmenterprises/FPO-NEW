import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AhoRoutingModule } from './aho-routing.module';
import { AhoDashboardComponent } from './aho-dashboard/aho-dashboard.component';
import { ScoringtoolComponent } from './scoringtool/scoringtool.component';
import { FpoprogressComponent } from './fpoprogress/fpoprogress.component';
import { FpomisComponent } from './fpomis/fpomis.component';
import { AllocationGradingComponent } from './allocation-grading/allocation-grading.component';
import { SchemeComponentComponent } from './scheme-component/scheme-component.component';
import { ReportComponentComponent } from './report-component/report-component.component';


@NgModule({
  declarations: [
    AhoDashboardComponent,
    ScoringtoolComponent,
    FpoprogressComponent,
    FpomisComponent,
    AllocationGradingComponent,
    SchemeComponentComponent,
    ReportComponentComponent
  ],
  imports: [
    CommonModule,
    AhoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AhoModule { }
