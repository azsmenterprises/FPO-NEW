import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdhRoutingModule } from './adh-routing.module';
import { AdhDashboardComponent } from './adh-dashboard/adh-dashboard.component';


@NgModule({
  declarations: [
    AdhDashboardComponent
  ],
  imports: [
    CommonModule,
    AdhRoutingModule
  ]
})
export class AdhModule { }
