import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IaRoutingModule } from './ia-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { TargetComponent } from './target/target.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FpotargetsComponent } from './target/fpotargets/fpotargets.component';
import { OperationaltargetsComponent } from './target/operationaltargets/operationaltargets.component';
import { FpoCbboTargetsComponent } from './target/fpo-cbbo-targets/fpo-cbbo-targets.component';
import { ChartsModule } from 'ng2-charts';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    DashboardComponent,
    // TargetComponent,
    TableComponent,
    FpotargetsComponent,
    OperationaltargetsComponent,
    FpoCbboTargetsComponent
  ],
  imports: [
    CommonModule,
    IaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    ChartsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ]
})
export class IaModule { }
