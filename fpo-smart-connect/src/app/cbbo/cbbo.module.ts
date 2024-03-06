import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbboRoutingModule } from './cbbo-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManycbboComponent } from './manycbbo/manycbbo.component';
import { MisComponent } from './mis/mis.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DraftlistComponent } from './draftlist/draftlist.component';
import { MissingreportComponent } from './missingreport/missingreport.component';
import { BacklogComponent } from './backlog/backlog.component';
import { TargetachievementComponent } from './targetachievement/targetachievement.component';
// import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
    ManycbboComponent,
    MisComponent,
    DraftlistComponent,
    MissingreportComponent,
    BacklogComponent,
    TargetachievementComponent
    
  ],
  imports:[
    CommonModule,
    CbboRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CbboRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatButtonModule,
    FilterPipeModule,
    // NgxPaginationModule,
  ]
})
export class CbboModule { }
