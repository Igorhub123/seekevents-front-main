import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../interface/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CadUsuService {
  private apiURL = 'http://localhost:3000/cadusu';

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURL);
  }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiURL, usuario);
  }

  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURL}/${id}`);
  }

  buscarPorEmail(email: string): Observable<Usuario | null> {
    return this.http.get<Usuario | null>(`${this.apiURL}?email=${email}`);
  }

  login(email: string, senha: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.apiURL}?cduema=${email}`).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => 
          u.cduema.toLowerCase() === email.toLowerCase() && 
          u.cdusen === senha
        );
        return usuario || null;
      })
    );
  }

  atualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiURL}/${id}`, usuario);
  }

  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}