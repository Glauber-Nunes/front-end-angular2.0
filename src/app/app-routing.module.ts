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
import { AtendenteReplicaComponent } from './components/atendente/atendente-replica/atendente-replica.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { FornecedorSaveComponent } from './components/fornecedor/fornecedor-save/fornecedor-save.component';
import { OrdemUpdateComponent } from './components/ordemServico/ordem-update/ordem-update.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoSaveComponent } from './components/produto/produto-save/produto-save.component';
import { ProdutoViewComponent } from './components/produto/produto-view/produto-view.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ServicoListComponent } from './components/servico/servico-list/servico-list.component';
import { ServicoSaveComponent } from './components/servico/servico-save/servico-save.component';
import { ServicoViewComponent } from './components/servico/servico-view/servico-view.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { ServicoUpdateComponent } from './components/servico/servico-update/servico-update.component';
import { TecnicoSaveComponent } from './components/tecnico/tecnico-save/tecnico-save.component';

const routes: Routes = [
  {
    path:'usuarioCreate',component:UsuarioCreateComponent
  },
  
  {
    path:'login',component: LoginComponent
  },
  
 
  {
       path:'',component:NavComponent, canActivate: [AuthGuard], children: [
      {path:'home',component : HomeComponent},
      {path: 'atendentes',component:AtendenteListComponent},
      {path:'clientes',component:ClienteListComponent},
      {path:'atendentes/:id',component:AtendenteViewComponent},
      {path: 'visualizacao_cliente/:id',component:ClienteViewComponent},
      {path:'saveCliente',component:ClienteSaveComponent},
      {path:'alteracao_cliente/:id',component:ClienteUpdateComponent},
      {path:'saveAtendente',component:AtendenteSaveComponent},
      {path:'updateAtendente/:id',component:AtedenteUpdateComponent},
      {path:'fornecedores', component:FornecedorListComponent},
      {path:'fornecedores/:id',component:FornecedorViewComponent},
      {path:'ordem-servicos',component:OrdemListComponent},
      {path:'ordem-servicos/:id',component:OrdemViewComponent},
      {path:'saveOrdemServico',component:OrdemSaveComponent},
      {path: 'finalizarServico/:id',component:OrdemListComponent},
      {path:'atendentes/replica/:id',component:AtendenteReplicaComponent},
      {path:'saveFornecedor',component:FornecedorSaveComponent},
      {path: 'updateOrdemServico/:id',component:OrdemUpdateComponent},
      {path: 'updateFornecedor/:id',component:FornecedorUpdateComponent},
      {path: 'produtos',component:ProdutoListComponent},
      {path:'salvar_produto',component:ProdutoSaveComponent},
      {path:'visualizacao_produto/:id',component:ProdutoViewComponent},
      {path:'atualizacao_produto/:id',component:ProdutoUpdateComponent},
      {path:'servicos',component:ServicoListComponent},
      {path:'salvar_servico',component:ServicoSaveComponent},
      {path:'visualizacao_servico/:id',component:ServicoViewComponent},
      {path:'tecnicos',component:TecnicoListComponent},
      {path:'atualizacao_servico/:id',component:ServicoUpdateComponent},
      {path:'salvar_tecnico',component:TecnicoSaveComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
