import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { NavComponent } from './components/templates/nav/nav.component';
import { HomeComponent } from './components/templates/home/home.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { AtendenteListComponent } from './components/atendente/atendente-list/atendente-list.component';
import { AtendenteSaveComponent } from './components/atendente/atendente-save/atendente-save.component';
import { LoginComponent } from './components/templates/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptor/auth.interceptor';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteSaveComponent } from './components/cliente/cliente-save/cliente-save.component';
import { AtendenteViewComponent } from './components/atendente/atendente-view/atendente-view.component';
import { ClienteViewComponent } from './components/cliente/cliente-view/cliente-view.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { AtedenteUpdateComponent } from './components/atendente/atedente-update/atedente-update.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { FornecedorSaveComponent } from './components/fornecedor/fornecedor-save/fornecedor-save.component';
import { FornecedorViewComponent } from './components/fornecedor/fornecedor-view/fornecedor-view.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { OrdemListComponent } from './components/ordemServico/ordem-list/ordem-list.component';
import { OrdemViewComponent } from './components/ordemServico/ordem-view/ordem-view.component';
import { MatRadioModule } from '@angular/material/radio';
import { OrdemSaveComponent } from './components/ordemServico/ordem-save/ordem-save.component';
import { FormControl } from '@angular/forms';   
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { AtendenteReplicaComponent } from './components/atendente/atendente-replica/atendente-replica.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { ConfirmDialogComponent } from './components/ConfirmDialogComponent/ConfirmDialogComponent';
import { MatDialogModule } from '@angular/material/dialog';
import { OrdemUpdateComponent } from './components/ordemServico/ordem-update/ordem-update.component';
import { ProdutoSaveComponent } from './components/produto/produto-save/produto-save.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoViewComponent } from './components/produto/produto-view/produto-view.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ServicoListComponent } from './components/servico/servico-list/servico-list.component';
import { ServicoSaveComponent } from './components/servico/servico-save/servico-save.component';
import { ServicoViewComponent } from './components/servico/servico-view/servico-view.component';
import { ServicoUpdateComponent } from './components/servico/servico-update/servico-update.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoSaveComponent } from './components/tecnico/tecnico-save/tecnico-save.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    AtendenteListComponent,
    AtendenteSaveComponent,
    LoginComponent,
    ClienteListComponent,
    ClienteSaveComponent,
    AtendenteViewComponent,
    ClienteViewComponent,
    ClienteUpdateComponent,
    AtedenteUpdateComponent,
    FornecedorListComponent,
    FornecedorSaveComponent,
    FornecedorViewComponent,
    FornecedorUpdateComponent,
    OrdemListComponent,
    OrdemViewComponent,
    OrdemSaveComponent,
    ClienteDeleteComponent,
    AtendenteReplicaComponent,
    ConfirmDialogComponent,
    UsuarioCreateComponent,
    OrdemUpdateComponent,
    ProdutoSaveComponent,
    ProdutoListComponent,
    ProdutoViewComponent,
    ProdutoUpdateComponent,
    ServicoListComponent,
    ServicoSaveComponent,
    ServicoViewComponent,
    ServicoUpdateComponent,
    TecnicoListComponent,
    TecnicoSaveComponent,
    TecnicoUpdateComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton:true,
      timeOut:6000,
      progressBar:true,
    }
    )
  ], 
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
