import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,private toast:ToastrService,
    private autService : AutenticacaoService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
  }

  sair(){
    this.autService.sair();
    this.router.navigate(['/login'])
    this.toast.info('Logout Efetuado Com Sucesso');
  }

}
