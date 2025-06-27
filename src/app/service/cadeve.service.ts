import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Cadeve } from '../interface/cadeve.model';

@Injectable({
    providedIn: 'root'
})
export class EventoService {
    private apiUrl = 'http://localhost:3000/eventos';

    constructor(private http: HttpClient) { }

    getEventoById(id: number): Observable<Cadeve> {
        return this.http.get<Cadeve>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse) {
        console.error('Erro na requisição:', error);
        return throwError(() => new Error('Ocorreu um erro ao carregar o evento'));
    }

    cadastrar(evento: Cadeve): Observable<Cadeve> {
        return this.http.post<Cadeve>(this.apiUrl, evento);
    }

    listar(): Observable<Cadeve[]> {
        return this.http.get<Cadeve[]>(this.apiUrl);
    }
}
