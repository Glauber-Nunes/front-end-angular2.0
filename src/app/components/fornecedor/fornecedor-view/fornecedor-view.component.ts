import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-view',
  templateUrl: './fornecedor-view.component.html',
  styleUrls: ['./fornecedor-view.component.css']
})
export class FornecedorViewComponent implements OnInit {

  id_forne = ''

  fornecedor : Fornecedor = {
    id: '',
    nome:'',
    municipio:'',
    uf:'',
    cnpj: '',
  }


  constructor(private route:ActivatedRoute,private router: Router,
    private fornecedorService:FornecedorService) { }

    ngOnInit(): void {
      this.id_forne  = this.route.snapshot.paramMap.get('id')!
      this.findById();
    }
  
    fechar(){
      this.router.navigate(['fornecedores'])
    }
  
    findById():void{
      this.fornecedorService.findById(this.id_forne).subscribe((resposta=>{
        this.fornecedor = resposta;
      }))
    }

}
