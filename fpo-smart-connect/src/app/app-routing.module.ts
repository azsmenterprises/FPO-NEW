import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth/authGuard/auth-guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './main-layout/layout/layout.component';
const routes: Routes = [
  {
    path: 'fpo',
    component: LayoutComponent,
    canActivate: [AuthGuardGuard],
    data: { role: ['FPO'] },
    children: [{
      path: '',
      loadChildren:
        // './layout/admin-layout/admin-layout.module#AdminLayoutModule'
        () => import('./fpo/admin-layout.module').then(module => module.AdminLayoutModule)
    }]
  },
  {
    path: "userLogin",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "admin",
    // component: RootComponent,
    component: LayoutComponent,
    canActivate: [AuthGuardGuard],
    data: { role: ['Admin'] },
    children: [{
      path: "",
      loadChildren:
        // './adminLayout/admin/admin.module#AdminModule'
        () => import('./admin/admin.module').then(module => module.AdminModule)
    }]
  },
  {
    path: "cbbo",
    // component: MainComponent,
    component: LayoutComponent,
    canActivate: [AuthGuardGuard],
    data: { role: ['Cbbo'] },
    children: [{
      path: "",
      loadChildren:
        // './cbbo-layout/cbbo/cbbo.module#CbboModule'
        () => import('./cbbo/cbbo.module').then(module => module.CbboModule)
    }]
  },
  {
    path: "ia",
    component: LayoutComponent,
    canActivate: [AuthGuardGuard],
    data: { role: ['ia'] },
    children: [{
      path: "",
      loadChildren:
        // './ia-layout/ia/ia.module#IaModule'
        () => import('./ia/ia.module').then(module => module.IaModule)

    }]
  },
  {
    path: "adh",
    component: LayoutComponent,
    // canActivate: [AuthGuardGuard],
    data: { role: ['ADH'] },
    children: [{
      path: "",
      loadChildren:
        // './ia-layout/ia/ia.module#IaModule'
        () => import('./adh/adh.module').then(module => module.AdhModule)

    }]
  },
  {
    path: "aho",
    component: LayoutComponent,
    // canActivate: [AuthGuardGuard],
    data: { role: ['AHO'] },
    children: [{
      path: "",
      loadChildren:
        // './ia-layout/ia/ia.module#IaModule'
        () => import('./aho/aho.module').then(module => module.AhoModule)

    }]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'fig',
    // component: RootLayoutComponent,
    component: LayoutComponent,
    canActivate: [AuthGuardGuard],
    data: { role: ['FIG'] },
    children: [{
      path: '',
      loadChildren:
        // './fig-layout/fig-layout.module#FigLayoutModule'
        () => import('./fig/fig-layout.module').then(module => module.FigLayoutModule)
    }]
  },
  {
    path: 'consumerGroup',
    // component: ConsumerGroupComponent,
    component: LayoutComponent,
    canActivate: [AuthGuardGuard],
    data: { role: ['ConsumerGroup', 'Trader'] },
    children: [{
      path: '',
      loadChildren:
        // './consumerGroup/consumer-group/consumer-group.module#ConsumerGroupModule'
        () => import('./consumerGroup/consumer-group.module').then(module => module.ConsumerGroupModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      //onSameUrlNavigation:'reload',
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
