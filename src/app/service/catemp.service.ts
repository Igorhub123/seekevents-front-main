import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CatEmp } from "../interface/catemp.model";

@Injectable({
    providedIn: 'root',
})
export class CatEmpService {
    private apiURL = 'http://localhost:3000/catemp';

    constructor(private http: HttpClient) { }

    listarcategoria(): Observable<CatEmp[]> {
        return this.http.get<CatEmp[]>(this.apiURL);
    }
}