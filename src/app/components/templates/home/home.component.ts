import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nomeUsuario: string;

  constructor(private service:ClienteService,private serviceProduto:ProdutoService,
    private osService:OrdemServicoService,private router: Router
  ) { }

  quantidadeClientes: number;
  quantidadeProdutos: number;
  quantidadeOs: number;

 ngOnInit(): void {
 this.countCliente();
 this.countOrdemServico();
 this.countProduto();
}

countCliente(): any {
  this.service.countCliente().subscribe(
    quantidade => {
      this.quantidadeClientes = quantidade;
    },
    error => {
      console.error('Erro ao obter a quantidade de clientes:', error);
      this.quantidadeClientes = 0; // Define a quantidade de clientes como 0 em caso de erro
    }
  );
}

countProduto(): any {
  this.serviceProduto.countProduto().subscribe(
    quantidade => {
      this.quantidadeProdutos = quantidade;
    },
    error => {
      console.error('Erro ao obter a quantidade de produtos:', error);
      this.quantidadeClientes = 0; // Define a quantidade de clientes como 0 em caso de erro
    }
  );
}

countOrdemServico(): any {
  this.osService.countOrdemServico().subscribe(
    quantidade => {
      this.quantidadeOs = quantidade;
    },
    error => {
      console.error('Erro ao obter a quantidade de ordem servicos:', error);
      this.quantidadeClientes = 0; // Define a quantidade de clientes como 0 em caso de erro
    }
  );
}

  mostrarBotoes = false;

  toggleButtons() {
    this.mostrarBotoes = !this.mostrarBotoes;
  }

  redirectToProducts() {
    this.router.navigate(['/produtos']); 
  }

  redirectToClientes() {
    this.router.navigate(['/clientes']); 
  }

  redirectToOs() {
    this.router.navigate(['/ordem-servicos']); 
  }
}
