import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CadPer } from "../interface/cadper.model";

@Injectable({
    providedIn: 'root',
})
export class CadPerService {
    private apiURL = 'http://localhost:3000/cadper';

    constructor(private http: HttpClient) { }

    listarperfil(): Observable<CadPer[]> {
        return this.http.get<CadPer[]>(this.apiURL);
    }
}