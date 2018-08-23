import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from './services/auth.guard';
import { DefaultComponent } from './components/default/default.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { VerifiedUserComponent } from "./components/verified-user/verified-user.component";
//import { SidebarComponent } from "./sidebar/sidebar.component";

const routes: Routes = [

  //{ path: '', redirectTo: '/', pathMatch: 'full' },
  
  // {
  //   path: '', 
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard], 
  //   component: DefaultComponent,
  //   children: [
  //     { path: 'home', component: HomeComponent},
  //   ]
  // },

  
  { path: '', component: DefaultComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  //{ path: '/', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: VerifiedUserComponent/*, canActivate: [AuthGuard]*/ },
  //   {
  //     path: "",
  //     component: SidebarComponent,
  //     outlet: "sidebar"
  //   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }