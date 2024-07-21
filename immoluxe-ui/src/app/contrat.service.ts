import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from './properties';
import {Contrat} from "./contrats";

@Injectable({
  providedIn: 'root'
})
export class contratService {

  private baseURL = "http://localhost:8080/api/v1/contrat";

  constructor(private httpClient: HttpClient) { }

  getContratsList(): Observable<Contrat[]>{
    return this.httpClient.get<Contrat[]>(`${this.baseURL}`);
  }

  addContrat(contrat: Contrat): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, contrat);
  }


  getContratById(id: number): Observable<Contrat>{
    return this.httpClient.get<Contrat>(`${this.baseURL}/${id}`);
  }

  updateContrat(id: number, contrat: Contrat): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, contrat);
  }

  deleteContrat(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
