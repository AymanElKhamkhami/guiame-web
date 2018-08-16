import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";


import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./login/login.component";
//import { SidebarComponent } from "./sidebar/sidebar.component";

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/welcome',
  //   pathMatch: 'full'
  // },
  { path: '', component: HomeComponent /*,canActivate: [AuthGuard]*/ },
  { path: "login", component: LoginComponent },
  //   {
  //     path: "",
  //     component: SidebarComponent,
  //     outlet: "sidebar"
  //   },
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);