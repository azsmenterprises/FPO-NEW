import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FigLayoutRoutingModule } from './fig-layout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppliedFarmersComponent } from './applied-farmers/applied-farmers.component';
import { FigServiceService } from './fig-service.service';
import { IndentSaleComponent } from './produced-aggregator/indent-sale/indent-sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppliedIndentForSaleComponent } from './produced-aggregator/applied-indent-for-sale/applied-indent-for-sale.component';
import { ApprovedByFpoComponent } from './produced-aggregator/approved-by-fpo/approved-by-fpo.component';
import { RejectByFpoComponent } from './produced-aggregator/reject-by-fpo/reject-by-fpo.component';
import { RegisterIndentComponent } from './indent-generation/register-indent/register-indent.component';
import { SubmittedIndentComponent } from './indent-generation/submitted-indent/submitted-indent.component';
import { IndentApprovedByFpoComponent } from './indent-generation/indent-approved-by-fpo/indent-approved-by-fpo.component';
import { IndentRejectedByFpoComponent } from './indent-generation/indent-rejected-by-fpo/indent-rejected-by-fpo.component';
import { ForwardToFpoComponent } from './produced-aggregator/forward-to-fpo/forward-to-fpo.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AppliedFarmersComponent,
    IndentSaleComponent,
    AppliedIndentForSaleComponent,
    ApprovedByFpoComponent,
    RejectByFpoComponent,
    RegisterIndentComponent,
    SubmittedIndentComponent,
    IndentApprovedByFpoComponent,
    IndentRejectedByFpoComponent,
    ForwardToFpoComponent,
  ],
  imports: [
    CommonModule,
    FigLayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FigServiceService],
})
export class FigLayoutModule {}
