import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aprendiz, CreateAprendizDto, UpdateAprendizDto } from './aprendiz.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AprendicesService {

  private http = inject(HttpClient);
  private readonly apiUrl = '${environment.apiUrl}/api/v1/aprendices';

  getAll(): Observable<Aprendiz[]> {
    return this.http.get<Aprendiz[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Aprendiz> {
    return this.http.get<Aprendiz>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateAprendizDto): Observable<Aprendiz> {
    return this.http.post<Aprendiz>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateAprendizDto): Observable<Aprendiz> {
    return this.http.patch<Aprendiz>(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
