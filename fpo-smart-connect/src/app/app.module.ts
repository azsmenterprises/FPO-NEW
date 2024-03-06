import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutModule } from './fpo/admin-layout.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { AuthLayoutModule } from './auth/auth-layout.module';
import { AuthGuardGuard } from './auth/authGuard/auth-guard.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './main-layout/layout/layout.component';
import { SidebarComponent } from './main-layout/sidebar/sidebar.component';
import { HeaderComponent } from './main-layout/header/header.component';
import { FooterComponent } from './main-layout/footer/footer.component';
// import { AdminModule } from './admin/admin.module';
// import { FigLayoutModule } from './fig/fig-layout.module';
// import { ConsumerGroupModule } from './consumerGroup/consumer-group.module';
// import { CbboModule } from './cbbo/cbbo.module';
// import { IaModule } from './ia/ia.module';
// import { AdminLayoutComponent } from './adminLayout/components/admin-layout/admin-layout.component';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent, LayoutComponent, SidebarComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminLayoutModule,
    // AdminModule,
    RouterModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    // CbboModule,
    // IaModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
    }),
    AuthLayoutModule,
    // FigLayoutModule,
    // ConsumerGroupModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    MatTabsModule,

    // FlatpickrModule.forRoot(),
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
