import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth/authGuard/auth-guard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { AddedProductsComponent } from './added-products/added-products.component';
import { ApproveConsumerComponent } from './approve-consumer/approve-consumer.component';
import { ApprovedConsumersComponent } from './approved-consumers/approved-consumers.component';
import { CgDashboardComponent } from './cg-dashboard/cg-dashboard.component';
import { ConsumerRegistrationComponent } from './consumer-registration/consumer-registration.component';
import { RelevantFposComponent } from './relevant-fpos/relevant-fpos.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuardGuard],
        data: { role: ['ConsumerGroup','Trader'] },
        component: CgDashboardComponent,
      },
      {
        path:'consumerRegistration',
        canActivate:[AuthGuardGuard],
        data: { role: ['ConsumerGroup','Trader'] },
        component:ConsumerRegistrationComponent
      },
      {
        path:'approveConsumers',
        canActivate:[AuthGuardGuard],
        data: { role: ['ConsumerGroup','Trader'] },
        component:ApproveConsumerComponent
      },
      {
        path:'approvedConsumers',
        canActivate:[AuthGuardGuard],
        data: { role: ['ConsumerGroup','Trader'] },
        component:ApprovedConsumersComponent
      },
      {
        path:'addProduct',
        canActivate:[AuthGuardGuard],
        data: { role: ['ConsumerGroup','Trader'] },
        component:AddProductComponent
      },
      {
        path:'addedProducts',
        canActivate:[AuthGuardGuard],
        data: { role: ['ConsumerGroup','Trader'] },
        component:AddedProductsComponent
      },
      {
        path:'relevantFPOs',
        canActivate:[AuthGuardGuard],
        data: { role: ['ConsumerGroup','Trader'] },
        component:RelevantFposComponent
      },
      {
        path:'updateProfile',
        canActivate:[AuthGuardGuard],
        data: { role: ['ConsumerGroup','Trader'] },
        component:UpdateProfileComponent
      },
      

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ConsumerGroupRoutingModule {}