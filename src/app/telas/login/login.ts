// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  usuario = {
    email: '',
    senha: ''
  };
  
  mensagemErro = '';
  carregando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.usuario.email || !this.usuario.senha) {
      this.mensagemErro = 'Por favor, preencha todos os campos!';
      return;
    }

    this.carregando = true;
    this.mensagemErro = '';

    this.authService.login(this.usuario.email, this.usuario.senha).subscribe({
      next: (response) => {
        this.carregando = false;
        if (response.success) {
          this.router.navigate(['/principal']);
        } else {
          this.mensagemErro = response.message || 'Email ou senha incorretos';
          this.usuario.senha = '';
        }
      },
      error: (error) => {
        this.carregando = false;
        this.mensagemErro = 'Erro na conexão. Tente novamente.';
        this.usuario.senha = '';
      }
    });
  }
}