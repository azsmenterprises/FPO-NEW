import { Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/authGuard/auth-guard.guard';
import { AddComponent } from './add/add.component';
import { ApproveFigsComponent } from './approve-figs/approve-figs.component';
import { ApproveForwardedFarmerByFigComponent } from './approve-forwarded-farmer-by-fig/approve-forwarded-farmer-by-fig.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemandAddOwnComponent } from './demand-aggregator/demand-add-own/demand-add-own.component';
import { DemandApproveComponent } from './demand-aggregator/demand-approve/demand-approve.component';
import { DemandApprovedListComponent } from './demand-aggregator/demand-approved-list/demand-approved-list.component';
import { DemandRejectedListComponent } from './demand-aggregator/demand-rejected-list/demand-rejected-list.component';
import { DemandListComponent } from './demand-aggregator/demand-list/demand-list.component';
import { EditComponent } from './edit/edit.component';
import { LinkWithELicensingComponent } from './external-services/link-with-e-licensing/link-with-e-licensing.component';
import { FigsApprovedComponent } from './figs-approved/figs-approved.component';
import { AddGodownComponent } from './fpo-godown-management/add-godown/add-godown.component';
import { GodownStockSaleComponent } from './fpo-godown-management/godown-stock-sale/godown-stock-sale.component';
import { StockTransferComponent } from './fpo-godown-management/stock-transfer/stock-transfer.component';
import { StocksForReceiptComponent } from './fpo-godown-management/stocks-for-receipt/stocks-for-receipt.component';
import { StocksReportComponent } from './fpo-godown-management/stocks-report/stocks-report.component';
import { TransitStatusComponent } from './fpo-godown-management/transit-status/transit-status.component';
// import { FpoProfileUpdateComponent } from './fpo-profile-update/fpo-profile-update.component';
import { BoardOfDirectorsComponent } from './fpoProfileUpdateNew/board-of-directors/board-of-directors.component';
import { BusinessActivityComponent } from './fpoProfileUpdateNew/business-activity/business-activity.component';
import { FinalcialAndLigalComponent } from './fpoProfileUpdateNew/finalcial-and-legal/finalcial-and-ligal.component';
import { FpoDetailsComponent } from './fpoProfileUpdateNew/fpo-details/fpo-details.component';
import { GroupDetailsComponent } from './fpoProfileUpdateNew/group-details/group-details.component';
import { OthersComponent } from './fpoProfileUpdateNew/others/others.component';
import { SingleWindowProfileUpdateComponent } from './fpoProfileUpdateNew/single-window-profile-update/single-window-profile-update.component';
import { ProducedAddOwnComponent } from './produced-aggregator/produced-add-own/produced-add-own.component';
import { ProducedApproveComponent } from './produced-aggregator/produced-approve/produced-approve.component';
import { ProducedListComponent } from './produced-aggregator/produced-list/produced-list.component';
import { ProducedRejectedListComponent } from './produced-aggregator/produced-rejected-list/produced-rejected-list.component';
import { SoldProductsComponent } from './produced-aggregator/sold-products/sold-products.component';
import { RelevantConsumerGroupsComponent } from './relevant-consumer-groups/relevant-consumer-groups.component';
import { RelevantTraderComponent } from './relevant-trader/relevant-trader.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: DashboardComponent,
  },
  {
    path: 'edit',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: EditComponent,
  },
  // {
  //   path: 'updateProfile',
  //   canActivate: [AuthGuardGuard],
  //   data: { role: ['FPO'] },
  //   component: FpoProfileUpdateComponent,
  // },
  {
    path: 'add',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: AddComponent,
  },
  {
    path: 'update-profile-data',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: SingleWindowProfileUpdateComponent,
  },
  {
    path: 'basic-information',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: FpoDetailsComponent,
  },
  {
    path: 'management',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: BoardOfDirectorsComponent,
  },
  {
    path: 'membership',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: GroupDetailsComponent,
  },
  {
    path: 'business-activity',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: BusinessActivityComponent,
  },
  {
    path: 'financial-legal',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: FinalcialAndLigalComponent,
  },
  {
    path: 'others',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: OthersComponent,
  },
  {
    path: 'approve-farmer',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: ApproveForwardedFarmerByFigComponent,
  },
  {
    path: 'demand/approve',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: DemandApproveComponent,
  },
  {
    path: 'demand/approved-list',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: DemandApprovedListComponent,
  },
  {
    path: 'demand/add-by-own',
    canActivate: [AuthGuardGuard],
    data: { role:[ 'FPO'] },
    component: DemandAddOwnComponent,
  },
  {
    path: 'demand/rejected-list',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: DemandRejectedListComponent,
  },
  {
    path: 'demand/demand-list',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: DemandListComponent,
  },
  
  {
    path: 'produced/add-own',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: ProducedAddOwnComponent,
  },
  {
    path: 'produced/rejected-list',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: ProducedRejectedListComponent,
  },
  {
    path: 'produced/approve',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: ProducedApproveComponent,
  },
  {
    path: 'produced/approved-list',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: ProducedListComponent,
  },
  {
    path: 'link-with-eLicensing',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: LinkWithELicensingComponent,
  },
  {
    path: 'relevantConsumerGroup',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: RelevantConsumerGroupsComponent,
  },
  {
    path: 'relevantTrader',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: RelevantTraderComponent,
  },
  {
    path: 'approve-fig',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: ApproveFigsComponent,
  },
  {
    path: 'fig-approved',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: FigsApprovedComponent,
  },
  {
    path: 'produced/sold-products',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    component: SoldProductsComponent,
  },
  {
    path: 'godown-magangement',
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    children: [
      {
        path: 'add-godown',
        canActivate: [AuthGuardGuard],
        data: { role: ['FPO'] },
        component:AddGodownComponent
      },
      {
        path: 'stock-transfer',
        canActivate: [AuthGuardGuard],
        data: { role: ['FPO'] },
        component:StockTransferComponent
      },
      {
        path: 'stock-for-receipt',
        canActivate: [AuthGuardGuard],
        data: { role: ['FPO'] },
        component:StocksForReceiptComponent
      },
      {
        path: 'stocks-report',
        canActivate: [AuthGuardGuard],
        data: { role: ['FPO'] },
        component:StocksReportComponent
      },
      {
        path: 'transit-status',
        canActivate: [AuthGuardGuard],
        data: { role: ['FPO'] },
        component:TransitStatusComponent
      },
      {
        path: 'stock-sale',
        canActivate: [AuthGuardGuard],
        data: { role: ['FPO'] },
        component:GodownStockSaleComponent
      },
     
    ]
  }
];
