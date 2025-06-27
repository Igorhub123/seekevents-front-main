import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CadPer } from '../../interface/cadper.model';
import { CadPerService } from '../../service/cadper.service';
import { Usuario } from '../../interface/usuario.model';
import { CadUsuService } from '../../service/cadusu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadusu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadusu.html',
  styleUrl: './cadusu.scss'
})
export class Cadusu implements OnInit {
  perfis: CadPer[] = [];
  perfilSelecionado: number | null = null;

  usuario: Usuario = {
    cdunom: '',
    cducpf: '',
    cduema: '',
    cdusen: '',
    cduper: 0,
    cdufac: '',
    cduins: '',
    cdutel: '',
    cdusta: 'ativo',
  }

  constructor(private cadPerService: CadPerService, private cadUsuService: CadUsuService, private router: Router) { }

  ngOnInit(): void {
    this.carregarPerfis();
  }

  carregarPerfis(): void {
    this.cadPerService.listarperfil().subscribe({
      next: (data: CadPer[]) => {
        this.perfis = data;
        console.log('Perfis carregados:', this.perfis);
      },
      error: (err) => {
        console.error('Erro ao carregar perfis:', err);
      }
    });
  }

  salvar(): void {
    this.cadUsuService.cadastrarUsuario(this.usuario).subscribe((res) => { this.router.navigate(['/login'])})
  }
}