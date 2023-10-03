import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/templates/nav/nav.component';
import { HomeComponent } from './components/templates/home/home.component';
import { AtendenteListComponent } from './components/atendente/atendente-list/atendente-list.component';
import { LoginComponent } from './components/templates/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { AtendenteViewComponent } from './components/atendente/atendente-view/atendente-view.component';
import { ClienteViewComponent } from './components/cliente/cliente-view/cliente-view.component';
import { ClienteSaveComponent } from './components/cliente/cliente-save/cliente-save.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { AtendenteSaveComponent } from './components/atendente/atendente-save/atendente-save.component';
import { AtedenteUpdateComponent } from './components/atendente/atedente-update/atedente-update.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { FornecedorViewComponent } from './components/fornecedor/fornecedor-view/fornecedor-view.component';
import { OrdemListComponent } from './components/ordemServico/ordem-list/ordem-list.component';
import { OrdemViewComponent } from './components/ordemServico/ordem-view/ordem-view.component';
import { OrdemSaveComponent } from './components/ordemServico/ordem-save/ordem-save.component';

const routes: Routes = [
  {
    path:'login',component: LoginComponent
  },
  {
    path:'',component:NavComponent, canActivate: [AuthGuard], children: [
      {path:'home',component : HomeComponent},
      {path: 'atendentes',component:AtendenteListComponent},
      {path:'clientes',component:ClienteListComponent},
      {path:'atendentes/:id',component:AtendenteViewComponent},
      {path: 'clientes/:id',component:ClienteViewComponent},
      {path:'saveCliente',component:ClienteSaveComponent},
      {path:'update/:id',component:ClienteUpdateComponent},
      {path:'saveAtendente',component:AtendenteSaveComponent},
      {path:'updateAtendente/:id',component:AtedenteUpdateComponent},
      {path:'fornecedores', component:FornecedorListComponent},
      {path:'fornecedores/:id',component:FornecedorViewComponent},
      {path:'ordem-servicos',component:OrdemListComponent},
      {path:'ordem-servicos/:id',component:OrdemViewComponent},
      {path:'saveOrdemServico',component:OrdemSaveComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
