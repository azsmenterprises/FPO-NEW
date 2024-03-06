import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerGroupRoutingModule } from './consumer-group-routing.module';
import { CgDashboardComponent } from './cg-dashboard/cg-dashboard.component';
import { ConsumerRegistrationComponent } from './consumer-registration/consumer-registration.component';
import { ApproveConsumerComponent } from './approve-consumer/approve-consumer.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RelevantFposComponent } from './relevant-fpos/relevant-fpos.component';
import { ApprovedConsumersComponent } from './approved-consumers/approved-consumers.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddedProductsComponent } from './added-products/added-products.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';


@NgModule({
  declarations: [
    CgDashboardComponent, ConsumerRegistrationComponent, ApproveConsumerComponent, AddProductComponent, RelevantFposComponent, ApprovedConsumersComponent, AddedProductsComponent, UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    ConsumerGroupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule
  ]
})
export class ConsumerGroupModule { }
