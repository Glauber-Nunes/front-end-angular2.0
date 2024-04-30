import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-save',
  templateUrl: './produto-save.component.html',
  styleUrls: ['./produto-save.component.css']
})
export class ProdutoSaveComponent implements OnInit {

  formulario: FormGroup;
  descricao = new FormControl(null, Validators.minLength(5));
  preco = new FormControl(null, Validators.minLength(1));
  imagemSelecionada: File = null;
  
  produto: Produto = {
    descricao: '',
    preco: 0,
    codeBarras: '',
    unEntrada: '',
    unSaida: '',
    estoque: 0,
    codigoNcm: ''
  };

  constructor(
    private router: Router,
    private service: ProdutoService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      descricao: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.router.navigate(['produtos']);
  }

  onFileSelected(event): void {
    this.imagemSelecionada = event.target.files[0];
  }

  save(): void {
    this.produto.descricao = this.formulario.get('descricao').value;
    this.produto.preco = this.formulario.get('preco').value;

    this.service.save(this.produto).subscribe(
      resposta => {
        this.router.navigate(['/produtos']);
        this.toast.info('Produto Salvo Com Sucesso!');
      },
      err => {
        if (err.error.error.match('Ja Cadastrado')) {
          this.toast.error(err.error.error);
          console.log(err);
        } else {
          // Lidar com outros erros
        }
      }
    );
  }

  validaCampos(): boolean {
    return this.descricao.valid && this.preco.valid;
  }
}
