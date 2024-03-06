import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminService } from './admin.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { FpoProfileUpdateComponent } from './fpo-profile-update/fpo-profile-update.component';
import { AddComponent } from './add/add.component';
import { FpoDetailsComponent } from './fpoProfileUpdateNew/fpo-details/fpo-details.component';
import { BoardOfDirectorsComponent } from './fpoProfileUpdateNew/board-of-directors/board-of-directors.component';
import { GroupDetailsComponent } from './fpoProfileUpdateNew/group-details/group-details.component';
import { BusinessActivityComponent } from './fpoProfileUpdateNew/business-activity/business-activity.component';
import { FinalcialAndLigalComponent } from './fpoProfileUpdateNew/finalcial-and-legal/finalcial-and-ligal.component';
import { OthersComponent } from './fpoProfileUpdateNew/others/others.component';
import { ApproveForwardedFarmerByFigComponent } from './approve-forwarded-farmer-by-fig/approve-forwarded-farmer-by-fig.component';
import { LinkWithELicensingComponent } from './external-services/link-with-e-licensing/link-with-e-licensing.component';
import { DemandAddOwnComponent } from './demand-aggregator/demand-add-own/demand-add-own.component';
import { DemandApproveComponent } from './demand-aggregator/demand-approve/demand-approve.component';
import { DemandApprovedListComponent } from './demand-aggregator/demand-approved-list/demand-approved-list.component';
import { DemandListComponent } from './demand-aggregator/demand-list/demand-list.component';
import { DemandRejectedListComponent } from './demand-aggregator/demand-rejected-list/demand-rejected-list.component';
import { ProducedAddOwnComponent } from './produced-aggregator/produced-add-own/produced-add-own.component';
import { ProducedApproveComponent } from './produced-aggregator/produced-approve/produced-approve.component';
import { ProducedListComponent } from './produced-aggregator/produced-list/produced-list.component';
import { ProducedRejectedListComponent } from './produced-aggregator/produced-rejected-list/produced-rejected-list.component';
import { DialogForSaleComponent } from './produced-aggregator/dialog-for-sale/dialog-for-sale.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RelevantConsumerGroupsComponent } from './relevant-consumer-groups/relevant-consumer-groups.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { ApproveFigsComponent } from './approve-figs/approve-figs.component';
import { FigsApprovedComponent } from './figs-approved/figs-approved.component';
import { SoldProductsComponent } from './produced-aggregator/sold-products/sold-products.component';
import { ForcefullyFpoProfileUpdateDialogComponent } from './forcefully-fpo-profile-update-dialog/forcefully-fpo-profile-update-dialog.component';
import { ModalModule } from 'ngb-modal';
import { AddGodownComponent } from './fpo-godown-management/add-godown/add-godown.component';
import { SingleWindowProfileUpdateComponent } from './fpoProfileUpdateNew/single-window-profile-update/single-window-profile-update.component';
import { StockTransferComponent } from './fpo-godown-management/stock-transfer/stock-transfer.component';
import { TransitStatusComponent } from './fpo-godown-management/transit-status/transit-status.component';
import { StocksForReceiptComponent } from './fpo-godown-management/stocks-for-receipt/stocks-for-receipt.component';
import { StocksReportComponent } from './fpo-godown-management/stocks-report/stocks-report.component';
import { GodownStockSaleComponent } from './fpo-godown-management/godown-stock-sale/godown-stock-sale.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { RelevantTraderComponent } from './relevant-trader/relevant-trader.component';
// import { DayService, MonthAgendaService, MonthService, RecurrenceEditorModule, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    RouterModule,
    // HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatStepperModule,
    ModalModule,
    MatExpansionModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatTabsModule
    // BrowserAnimationsModule

  ],
  declarations: [
    DashboardComponent,
    EditComponent,
    // FpoProfileUpdateComponent,
    AddComponent,
    FpoDetailsComponent,
    BoardOfDirectorsComponent,
    GroupDetailsComponent,
    BusinessActivityComponent,
    FinalcialAndLigalComponent,
    OthersComponent,
    ApproveForwardedFarmerByFigComponent,
    LinkWithELicensingComponent,
    DemandAddOwnComponent,
    DemandApproveComponent,
    DemandApprovedListComponent,
    DemandListComponent,
    DemandRejectedListComponent,
    ProducedAddOwnComponent,
    ProducedApproveComponent,
    ProducedListComponent,
    ProducedRejectedListComponent,
    DialogForSaleComponent,
    RelevantConsumerGroupsComponent,
    ApproveFigsComponent,
    FigsApprovedComponent,
    SoldProductsComponent,
    ForcefullyFpoProfileUpdateDialogComponent,
    AddGodownComponent,
    SingleWindowProfileUpdateComponent,
    StockTransferComponent,
    TransitStatusComponent,
    StocksForReceiptComponent,
    StocksReportComponent,
    GodownStockSaleComponent,
    RelevantTraderComponent,
   
  ],
  providers: [AdminService],
})
export class AdminLayoutModule { }
