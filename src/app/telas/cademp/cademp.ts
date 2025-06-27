import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatEmp } from '../../interface/catemp.model';
import { CadEmp } from '../../interface/cademp.model';
import { CadEmpService } from '../../service/cademp.service';
import { CatEmpService } from '../../service/catemp.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cademp.html',
  styleUrls: ['./cademp.scss']
})
export class Cademp implements OnInit {
  categoria: CatEmp[] = [];
  categoriaSelecionado: number | null = null;
  usuariologado: string = '';

  empresa: CadEmp = {
    cdenom: '',
    cdecnp: '',
    cdecte: 0,
    cdecen: 1,
    cdeusu: 0,
    cdesta: 'Ativo',
  }

  constructor(
    private cadEmpService: CadEmpService,
    private catEmpService: CatEmpService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authStatus$.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        //this.router.navigate(['/login']);
      } else {
        this.carregarCategoria();
        this.obterUsuarioLogado();
      }
    });
  }

  carregarCategoria() {
    this.catEmpService.listarcategoria().subscribe({
      next: (data: CatEmp[]) => {
        this.categoria = data;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
      }
    });
  }

  obterUsuarioLogado() {
    const usuario = this.authService.getUsuarioLogado();
    if (usuario) {
      this.empresa.cdeusu = usuario.cduide || 0;
      this.usuariologado = usuario.cdunom;
    } else {
      //this.router.navigate(['/login']);
    }
  }

  salvar(): void {
    this.cadEmpService.cadastrarUsuario(this.empresa).subscribe(() => {
      this.router.navigate(['/principal']);
    });
  }
}