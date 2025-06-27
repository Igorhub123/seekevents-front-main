// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CadUsuService } from './cadusu.service';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Usuario } from '../interface/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(
    private cadUsuService: CadUsuService,
    private router: Router
  ) {}

  login(email: string, senha: string): Observable<{ success: boolean; message?: string }> {
    return this.cadUsuService.login(email, senha).pipe(
      map(usuario => {
        if (usuario) {
          this.armazenarUsuario(usuario);
          this.authStatus.next(true);
          return { success: true };
        }
        return { success: false, message: 'Email ou senha incorretos' };
      }),
      catchError(() => {
        return of({ success: false, message: 'Erro no servidor. Tente novamente.' });
      })
    );
  }

  private armazenarUsuario(usuario: Usuario): void {
    localStorage.setItem('usuarioLogado', JSON.stringify({
      cduide: usuario.cduide,
      cdunom: usuario.cdunom,
      cduema: usuario.cduema,
      cduper: usuario.cduper
    }));
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuarioLogado');
  }

  getUsuarioLogado(): Usuario | null {
    const usuario = localStorage.getItem('usuarioLogado');
    return usuario ? JSON.parse(usuario) : null;
  }
}