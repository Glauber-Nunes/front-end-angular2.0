import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AtendenteListComponent } from './components/atendente/atendente-list/atendente-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'login',component: LoginComponent
  },
  {
    path:'',component:NavComponent, children: [
      {path:'home',component : HomeComponent},
      {path: 'atendentes',component:AtendenteListComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
