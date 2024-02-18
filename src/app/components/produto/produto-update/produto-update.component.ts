import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  formulario: FormGroup;

  descricao = new FormControl(null,Validators.minLength(5))
  preco = new FormControl(null,Validators.minLength(1))

  validaCampos():boolean{
    if(this.descricao.valid && this.preco.valid){
      return true;
    }else{
      return false;
    }
  }

  id_produto='';

  produto:Produto = {
    id:null,
    descricao:'',
    preco:0,
    codeBarras:'',
    unEntrada:'',
    unSaida:'',
    estoque:0,
    codigoNcm:''

  }
  constructor(private produtoService:ProdutoService,private route:ActivatedRoute,private router: Router
    ,private toast:ToastrService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id_produto = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById():void{
    this.produtoService.findById(this.id_produto).subscribe((resposta=>{
    this.produto = resposta;
  }))
}

update():void{
  this.produtoService.update(this.produto).subscribe((resposta=>{
  this.router.navigate(['produtos'])
  this.toast.info('Produto Atualizado Com Sucesso!');
}), err =>{
  if(err.error.error.match('Ja Cadastrado')){
    this.toast.error(err.error.error)
    console.log(err)
  }else{
   
  }
})
}


}
