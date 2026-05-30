import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TemaAprendizService } from './tema-aprendiz.service';
import { TemaAprendiz } from './tema-aprendiz.model';
import { AprendicesService } from '../aprendices/aprendices.service';
import { Aprendiz } from '../aprendices/aprendiz.model';
import { TemasService } from '../temas/temas.service';
import { Tema } from '../temas/tema.model';

@Component({
  selector: 'app-tema-aprendiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tema-aprendiz.component.html',
  styleUrls: ['./tema-aprendiz.component.css'],
})
export class TemaAprendizComponent implements OnInit {

  private service = inject(TemaAprendizService);
  private aprendicesService = inject(AprendicesService);
  private temasService = inject(TemasService);
  private cdr = inject(ChangeDetectorRef);

  asignaciones: TemaAprendiz[] = [];
  aprendices: Aprendiz[] = [];
  temas: Tema[] = [];

  selectedAprendizId = 0;
  selectedTemaId = 0;

  mensaje: { texto: string; tipo: 'success' | 'error' } | null = null;
  cargando = false;

  ngOnInit(): void {
    this.cargarTodo();
  }

  cargarTodo(): void {
    this.cargando = true;
    this.cdr.detectChanges();

    this.service.getAll().subscribe({
      next: (data) => {
        this.asignaciones = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar asignaciones:', err);
        this.mostrarMensaje('Error al cargar las asignaciones.', 'error');
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });

    this.aprendicesService.getAll().subscribe({
      next: (data) => {
        this.aprendices = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar aprendices:', err),
    });

    this.temasService.getAll().subscribe({
      next: (data) => {
        this.temas = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar temas:', err),
    });
  }

  crearAsignacion(): void {
    if (!this.selectedAprendizId || !this.selectedTemaId) return;

    this.service.create({
      idAprendiz: Number(this.selectedAprendizId),
      idTema: Number(this.selectedTemaId),
    }).subscribe({
      next: () => {
        this.selectedAprendizId = 0;
        this.selectedTemaId = 0;
        this.cargarTodo();
        this.mostrarMensaje('Asignacion creada exitosamente.', 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al crear asignacion:', err);
        const msg = err.error?.message ?? 'Error al crear la asignacion.';
        this.mostrarMensaje(Array.isArray(msg) ? msg[0] : msg, 'error');
        this.cdr.detectChanges();
      },
    });
  }

  eliminarAsignacion(id: number): void {
    if (!confirm('Seguro que deseas eliminar esta asignacion?')) return;

    this.service.remove(id).subscribe({
      next: () => {
        this.cargarTodo();
        this.mostrarMensaje('Asignacion eliminada exitosamente.', 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al eliminar asignacion:', err);
        const msg = err.error?.message ?? 'Error al eliminar la asignacion.';
        this.mostrarMensaje(Array.isArray(msg) ? msg[0] : msg, 'error');
        this.cdr.detectChanges();
      },
    });
  }

  private mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.mensaje = { texto, tipo };
    setTimeout(() => {
      this.mensaje = null;
      this.cdr.detectChanges();
    }, 4000);
  }
}
