import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadEmp } from '../interface/cademp.model';

@Injectable({
    providedIn: 'root'
})
export class CadEmpService {
    private apiURL = 'http://localhost:3000/cademp';

    constructor(private http: HttpClient) { }

    listarEmpresa() {
        return this.http.get<CadEmp[]>(this.apiURL);
    }

    cadastrarUsuario(empresa: CadEmp) {
        return this.http.post<CadEmp>(this.apiURL, empresa);
    }

    buscarEmpresa(id: number) {
        return this.http.get<CadEmp>(`${this.apiURL}/${id}`);
    }

    atualizarEmpresa(id: number, empresa: CadEmp) {
        return this.http.patch<CadEmp>(`${this.apiURL}/${id}`, empresa);
    }

    deletarEmpresa(id: number) {
        return this.http.delete<void>(`${this.apiURL}/${id}`);
    }
}