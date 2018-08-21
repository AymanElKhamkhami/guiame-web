import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { VerifiedUserComponent } from "./components/verified-user/verified-user.component";
//import { SidebarComponent } from "./sidebar/sidebar.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "auth", component: VerifiedUserComponent/*, canActivate: [AuthGuard]*/ },
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