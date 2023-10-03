import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendente } from 'src/app/model/Atendente';
import { AtendenteService } from 'src/app/services/atendente.service';

@Component({
  selector: 'app-atendente-view',
  templateUrl: './atendente-view.component.html',
  styleUrls: ['./atendente-view.component.css']
})
export class AtendenteViewComponent implements OnInit {


  id_atendente = ''

  atendente : Atendente = {
    id : '',
    nome:'',
    cpf:'',
  }

  constructor(private router:Router,private atendenteService : AtendenteService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_atendente = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById():void{
    this.atendenteService.findById(this.id_atendente).subscribe((resposta=>{
    this.atendente = resposta;
  }))
}

fechar(){
  this.router.navigate(['atendentes'])
}

}
