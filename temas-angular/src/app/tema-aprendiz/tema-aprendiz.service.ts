import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemaAprendiz, CreateTemaAprendizDto } from './tema-aprendiz.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TemaAprendizService {

  private http = inject(HttpClient);
  private readonly apiUrl = '${environment.apiUrl}/api/v1/tema-aprendiz';

  getAll(): Observable<TemaAprendiz[]> {
    return this.http.get<TemaAprendiz[]>(this.apiUrl);
  }

  create(dto: CreateTemaAprendizDto): Observable<TemaAprendiz> {
    return this.http.post<TemaAprendiz>(this.apiUrl, dto);
  }

  remove(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
