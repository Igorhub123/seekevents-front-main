import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service'; // Você precisará criar este serviço
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicial',
  template: `
    <div *ngIf="authService.isAuthenticated()">
      Conteúdo para usuários autenticados
    </div>
    <div *ngIf="!authService.isAuthenticated()">
      Por favor, faça login
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicial.html',
  styleUrls: ['./inicial.scss']
})
export class Inicial {
  @ViewChild('footerElement') footerElement!: ElementRef<HTMLElement>;
  showLoginOverlay = false;

  events = [1, 2, 3];

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  scrollToFooter(): void {
    this.footerElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleImageClick(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      // Lógica para quando o usuário estiver logado
      // this.router.navigate(['/detalhes-evento']);
    }
  }

  closeOverlay() {
    this.showLoginOverlay = false;
  }
}