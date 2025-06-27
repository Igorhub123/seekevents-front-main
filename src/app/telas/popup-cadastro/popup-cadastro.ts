import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-cadastro.html',
  styleUrls: ['./popup-cadastro.scss']
})
export class PopupCadastro {
  mostrarPopup = true;

  constructor(private router: Router) { }

  irParaCadastro(): void {
    this.router.navigate(['/cademp']);
  }

  fecharPopup(): void {
    this.mostrarPopup = false;
  }


}
