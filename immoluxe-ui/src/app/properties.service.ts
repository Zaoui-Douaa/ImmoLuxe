import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from './properties';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseURL = "http://localhost:8080/api/v1/properties";

  constructor(private httpClient: HttpClient) { }
  
  getPropertiesList(): Observable<Property[]>{
    return this.httpClient.get<Property[]>(`${this.baseURL}`);
  }

  addProperty(property: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, property);
  }

  getPropertyById(id: number): Observable<Property>{
    return this.httpClient.get<Property>(`${this.baseURL}/${id}`);
  }

  updateProperty(id: number, property: Property): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, property);
  }

  deleteProperty(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}