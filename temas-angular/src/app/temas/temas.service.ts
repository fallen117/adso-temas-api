import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema, CreateTemaDto, UpdateTemaDto } from './tema.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TemasService {

  private readonly apiUrl = `${environment.apiUrl}/api/v1/temas`;

  constructor(private http: HttpClient) {}

  // GET /temas
  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.apiUrl);
  }

  // GET /temas/:id
  getOne(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/${id}`);
  }

  // POST /temas
  create(dto: CreateTemaDto): Observable<Tema> {
    return this.http.post<Tema>(this.apiUrl, dto);
  }

  // PATCH /temas/:id
  update(id: number, dto: UpdateTemaDto): Observable<Tema> {
    return this.http.patch<Tema>(`${this.apiUrl}/${id}`, dto);
  }

  // DELETE /temas/:id
  remove(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
