import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServico } from 'src/app/model/OrdemServico';
import { AtendenteService } from 'src/app/services/atendente.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';   

@Component({
  selector: 'app-ordem-view',
  templateUrl: './ordem-view.component.html',
  styleUrls: ['./ordem-view.component.css']
})
export class OrdemViewComponent implements OnInit {


  id_ordem = ''

  ordem: OrdemServico = {
    id:null,
    atendente: null,
    situacaoOrdem:null,
    cliente:null,
    descricao:null,
    tecnico: null,
    dataDoServico: null ,// Modificação feita aqui,
    dataFechamento: null,
    servicos:[],
    produtos: [],
    fornecedor: null,
    observacoes:'',
    statusOrdemServico : null,
    valorTotalOrdem:null,
  };

  atendente: any; // Vai conter os dados do atendente
  cliente: any;   // Vai conter os dados do cliente



  constructor(private route:ActivatedRoute,private router: Router,
    private Service:OrdemServicoService) { }

  ngOnInit(): void {
    this.id_ordem = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  fechar(){
    this.router.navigate(['ordem-servicos'])
  }

  findById():void{
    this.Service.findById(this.id_ordem).subscribe((resposta=>{
      this.ordem = resposta;
    }))
  }

  getStatusClass(status: string): string {
    return status === 'ABERTA' ? 'status-aberta' : 'status-encerrada';
  }
  

}
